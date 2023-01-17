const RoomDto = require("../dtos/room-dto");
const roomService = require("../services/room-service");

class RoomsController {
	async create(req, res) {
		// room creating logic
		const { topic, roomType } = req.body;

		if (!topic || !roomType) {
			return res
				.status(400)
				.json({ message: "All fields are required!" });
		} //if no validation error proceed ahead

		const room = await roomService.create({
			topic,
			roomType,
			ownerId: req.user._id, //auth middleware sets user._id in req
		}); //pass the object we need to create

		return res.json(new RoomDto(room)); //new room created
	}

	async index(req, res) {
		const rooms = await roomService.getAllRooms("open");
		const allRooms = rooms.map((room) => new RoomDto(room)); //maps will be hevier, use pagination in future
		return res.json(allRooms);
	}

	async show(req, res) {
		const room = await roomService.getRoom(req.params.roomId);
		return res.json(room);
	}
}

module.exports = new RoomsController();
