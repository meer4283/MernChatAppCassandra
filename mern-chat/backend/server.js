// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const userController = require('./src/controllers/userController');
const messageController = require('./src/controllers/messageController');
const authMiddleware = require('./src/middlewares/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

// Routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.get('/messages', authMiddleware, messageController.getMessages);
app.post('/messages', authMiddleware, messageController.sendMessage);

// WebSocket
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('sendMessage', async (message) => {
    const savedMessage = await messageController.sendMessage({ body: message });
    io.emit('newMessage', savedMessage);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
