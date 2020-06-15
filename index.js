/* requiring all the dependencies for the module */
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const chat = require('./chat/chat'); // requiring the chat module 

const app = express(); // making the express app
const server = http.createServer(app); // creating the http server
const io = socketio.listen(server); //getting the socket.io server ready

server.listen(process.env.PORT || 5000 ,()=>{console.log('listening to port 5000')}); // listen to port 5000 

chat(app,io); //making the chat application ready for work

