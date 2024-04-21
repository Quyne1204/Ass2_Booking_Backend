const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authmid = require('./middleware/auth');
const auth = require('./routes/auth');
const hotel = require('./routes/hotel');
const room = require('./routes/room');
const transaction = require('./routes/transaction');
const admin = require('./routes/admin');
// const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.use('/auth', auth);
app.use('/hotels', hotel);
app.use('/rooms', room);
app.use('/transactions', transaction);
app.use("/admin", authmid, admin);

mongoose.connect('mongodb+srv://nvq12042003:quy12042003@cluster0.vdpgnlu.mongodb.net/booking?retryWrites=true&w=majority&appName=Cluster0')
    .then(result => {
        app.listen(5000);
    })
    .catch(err => console.log(err));