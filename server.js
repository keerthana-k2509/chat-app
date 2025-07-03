const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const users = {};

app.use(express.static('public'));

io.on('connection', socket => {
    socket.on('join', username => {
        users[socket.id] = username;
        socket.broadcast.emit('user-joined', username);
    });

    socket.on('chat-message', msg => {
        io.emit('chat-message', { message: msg, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
