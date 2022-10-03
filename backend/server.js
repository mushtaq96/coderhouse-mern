require('dotenv').config();//get credentials from .env file use process.env.MYVARIABLENAME
const express = require('express');
const app = express();
const router = require('./routes');
const DbConnect = require('./database');
const cors = require('cors'); // preventing CORS error, whitelisting the other domain
const corsOption = {
    origin: ['http://localhost:3000'],// frontend is running here
};
app.use(cors(corsOption)); // express uses this format i.e app.use() to apply respective middlewares


const PORT = process.env.PORT || 5500;
DbConnect();
app.use(express.json());
app.use(router);

app.get('/',(req, res) => {
    res.send('hello from express js');
});



app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));

