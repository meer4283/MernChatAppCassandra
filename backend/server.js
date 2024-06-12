const express = require('express');
const http = require('http');
const cors = require('cors');
const userController = require('./src/controllers/userController');
const messageController = require('./src/controllers/messageController');
const authMiddleware = require('./src/middlewares/authMiddleware');
const jwt = require('jsonwebtoken');
const messageService = require('./src/services/messageService');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.post('/register', userController.register);
app.post('/signin', userController.login);
app.get('/messages', authMiddleware, messageController.getMessages);
app.post('/messages', authMiddleware, messageController.sendMessage);

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (message) => {
    try {
      const token = socket.handshake.headers.authorization;
      const decoded = await jwt.verify(token, 'secretkey');
      const savedMessage = await messageService.sendMessage(
         decoded.id, 
        decoded.username,
        message.content,
      );
      io.emit('newMessage', savedMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
