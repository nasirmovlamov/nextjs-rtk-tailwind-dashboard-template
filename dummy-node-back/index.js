// server.js
const { Server } = require("socket.io");
const http = require('http');

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Sending a notification to the connected client
  setInterval(() => {
    socket.emit('newNotification', { message: 'Real-time update!', timestamp: new Date() });
  }, 3000); // Send a notification every 3 seconds

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('WebSocket server listening on port 4000');
});