// make connection
let socket = io.connect('http://localhost:3000');

// buttons and inputs elements
let message = document.querySelector('#message');
let username = document.querySelector('#username');
let send_message = document.querySelector('#send_message');
let send_username = document.querySelector('#send_username');
let chatroom = document.querySelector('#chatroom');
let feedback = document.querySelector('#feedback');

//Emit a username
function sendUsername(e){
  if (e.type === 'click' || e.keyCode == 13) {
    console.log(username.value);
    socket.emit('change_username',{username: username.value});
  }
}

// Emit message
function sendMessage(e){
  if (e.type === 'click' || e.keyCode == 13) {
    socket.emit('new_message',{message: message.value});
    message.value = "";
  }
}

// Listen for new message
socket.on('new_message',data=>{
  console.log(data);
  let p = document.createElement('p');
  p.classList.add("message");
  p.textContent = `${data.username}:${data.message}`;
  chatroom.append(p);
});

//Emit Typing
message.addEventListener('keydown',()=>{
  socket.emit('typing');
});

message.addEventListener('keyup',()=>{
  socket.emit('notTyping');
});

//Listen for typing
socket.on('typing', (data)=>{
  feedback.innerHTML = `<p><i>${data.username} is typing a message...</i></p>`;
});

socket.on('notTyping', (data)=>{
  feedback.innerHTML = `<p></p>`;
});

send_message.addEventListener('click', (e)=>sendMessage(e));
send_message.addEventListener('keydown', (e)=>sendMessage(e));
message.addEventListener('keydown', (e)=>sendMessage(e));
send_username.addEventListener('click',(e)=> sendUsername(e));
send_username.addEventListener('keydown',(e)=> sendUsername(e));
username.addEventListener('keydown',(e)=>sendUsername(e));
