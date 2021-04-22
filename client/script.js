let socket = io.connect();
let target = document.getElementById('target');
let nametarget = document.getElementById('username');
let username = prompt('Please enter your name to participate');
let gender = prompt('Are you male or female?');



socket.emit('displayUser', (username));

document.getElementById('submitall').addEventListener('click',function (){
    let message = document.getElementById('message').value;
    socket.emit('sendToAll', ('<img src ="' + gender + '.ico">' + '<strong>' + username + '</strong>' + ': ' + message));
});

document.getElementById('submitme').addEventListener('click',function (){
    let message = document.getElementById('message').value;
    socket.emit('sendToMe', ('<strong>' + username + '</strong>' + ': ' + message));
});

socket.on('displayMessage', (message) => {
    target.innerHTML += '<br>' + message + '<br>';
});

socket.on('displayUser', (nameinput) => {
    nametarget.innerHTML += '<br>'+ nameinput;
});

