import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const index = '../frontend/index.html';
import { Server } from 'socket.io';
const io = new Server(server);

app.get('/', (req, res) => {
	res.sendFile('/Users/hans/repos/express/chat-app/frontend/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});
