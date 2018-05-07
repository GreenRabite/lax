const express = require('express');

const app = express();

//setup view engine for index.html page
app.use(express.static('public'));

// Routes
app.get('/', function (req, res) {
  res.sendFile('index.html');
});


// Instruct node to listen to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT);
