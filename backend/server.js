require("dotenv").config(); //get credentials from .env file use process.env.MYVARIABLENAME
const express = require("express");
const app = express();
const router = require("./routes");
const DbConnect = require("./database");
const cors = require("cors"); // preventing CORS error, whitelisting the other domain
const cookieParser = require("cookie-parser");
const ACTIONS = require("./actions");

const server = require("http").createServer(app); //create a server and pass express

//set web socket server
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

app.use(cookieParser());

const corsOption = {
	origin: ["http://localhost:3000"], // frontend is running here
	credentials: true,
};
app.use(cors(corsOption)); // express uses this format i.e app.use() to apply respective middlewares
app.use("/storage", express.static("storage")); //to display the storage images on the url based on server

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({ limit: "8mb" }));
app.use(router);

app.get("/", (req, res) => {
	res.send("hello from express js");
});

//sockets
const socketUserMapping = {};

io.on("connection", (socket) => {
	console.log("new connection", socket.id); //once client is connected an id is assigned

	socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
		socketUserMapping[socket.id] = user;

		// new Map
		const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
		console.log(clients);

		clients.forEach((clientId) => {
			io.to(clientId).emit(ACTIONS.ADD_PEER, {
				peerId: socket.id,
				createOffer: false,
				user,
			});

			//create an offer for every client
			socket.emit(ACTIONS.ADD_PEER, {
				peerId: clientId,
				createOffer: true,
				user: socketUserMapping[clientId],
			});
		});

		socket.join(roomId);

		// Handle relay Ice
		socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
			io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
				peerId: socket.id,
				icecandidate,
			});
		});

		// Handle relay sdp ( session description )
		socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
			io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
				peerId: socket.id,
				sessionDescription,
			});
		});

		// Leaving the room
		const leaveRoom = ({ roomId }) => {
			const { rooms } = socket; //get all rooms

			Array.from(rooms).forEach((roomId) => {
				const clients = Array.from(
					io.sockets.adapter.rooms.get(roomId) || []
				);

				clients.forEach((clientId) => {
					io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
						//clientI d == socket id
						peerId: socket.id,
						userId: socketUserMapping[socket.id]?.id,
					});

					socket.emit(ACTIONS.REMOVE_PEER, {
						peerId: clientId,
						userId: socketUserMapping[clientId]?.id,
					});
				});

				socket.leave(roomId);
			});

			delete socketUserMapping[socket.id];
		};
		socket.on(ACTIONS.LEAVE, leaveRoom);
		socket.on("disconnecting", leaveRoom);
	});
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
