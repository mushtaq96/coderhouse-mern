require('dotenv').config();//get credentials from .env file use process.env.MYVARIABLENAME
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors'); // preventing CORS error, whitelisting the other domain
const cookieParser = require('cookie-parser');

app.use(cookieParser());

const corsOption = {
    origin: ['http://localhost:3000'],// frontend is running here
    credentials: true
};
app.use(cors(corsOption)); // express uses this format i.e app.use() to apply respective middlewares
app.use('/storage', express.static('storage'));//to display the storage images on the url based on server

const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json({limit: '8mb'}));
app.use(router);

app.get('/',(req, res) => {
    res.send('hello from express js');
});



app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));

