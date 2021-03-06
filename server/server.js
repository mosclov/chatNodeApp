const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log("User was disconnected")
  });


  socket.emit('newMessage', generateMessage("Admin", "Welcome to the chap atpp"))

  socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"))


  socket.on('createMessage', (message) => {
    console.log("createMessage", message)
    io.emit('newMessage', generateMessage(message.from, message.text))
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });
});

server.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
