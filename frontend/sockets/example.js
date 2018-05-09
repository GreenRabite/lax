module.exports = (server) => {
  // Websockets listening to every connection
  const io = require('socket.io')(server);
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

    socket.on('typing', data=>{
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });

    socket.on('notTyping', data=>{
      socket.broadcast.emit('notTyping', {

      });
    });
  });
};
