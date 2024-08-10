const express = require('express');
const app = express();

const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const routes = require('./routes/Routes');
const bodyParser = require('body-parser');
const mongoDB = require('./database/MongoDBConnect');
const cors = require('cors');
app.use(cors());
const cookieParser = require('cookie-parser');
const http = require('http');
const io = require('./configs/Socket');

dotenv.config();
mongoDB.connectDB();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);

io.initializeSocket(server);

routes(app);

server.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});
