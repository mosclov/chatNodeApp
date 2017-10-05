const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.emit('newMessage', {
    from: 'mikdejkee@aol.com',
    text: "Wassabbbiii",
    createdAt: 3222
  })

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });


  socket.on('createMessage', (message) => {
    console.log("createMessage", message)
  });
});

server.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
