const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

let counter = 0;
let counterDisconnect = 0;

port = 8080;

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));


server.listen(port, () => {
    console.log("server running on " + port);
});

io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' someone connected');
    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", (message));
    });

    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));});


    socket.on('displayUser', (nameinput) => {
        userArray.push({socketId:socket.id, username:username})
        io.emit('displayUser', (userArray));});

    socket.on('disconnect', function () {
        counterDisconnect++;
        userArray.forEach((nameinput, index) => {
            if (socket.id === nameinput.socketId){
                userArray.splice(index,1);
                console.log(nameinput.nameinput + ' disconnected');
            }
            io.emit('displayUser', (userArray));
    });
});
