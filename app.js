const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
require('./backend/users/userModel');

require('./backend/users/userAPI');


const app = express();

//setup view engine for index.html page
app.set('view engine', 'ejs');

//public static directory
app.use(express.static('public'));

//Parses the Body
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.raw());

// Routes
app.get('/', function (req, res) {
  res.render('index');
});
require('./backend/users/userAPI')(app);

// Instruct node to listen to port 3000
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT);

// socket.io example
// require('./frontend/sockets/example')(server);
