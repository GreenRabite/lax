const express = require('express');
const mongoose = require('mongoose');


const app = express();

//setup view engine for index.html page
app.set('view engine', 'ejs');

//public static directory
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {
  res.render('index');
});

// Instruct node to listen to port 3000
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT);

// socket.io example 
require('./frontend/sockets/example')(server);
