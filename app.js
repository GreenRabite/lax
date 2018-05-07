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

const io = require('socket.io')(server);


// Websockets listening to every connection
io.on('connection',(socket)=>{
  console.log('New User connected');

  // default username
  socket.username = "Annoymous";

  // listen on change_username
  socket.on('change_username',data =>{
    socket.username = data.username;
  });

  //listen on new message
  socket.on('new_message',data=>{
    // broadcast the new message
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
  });
});
