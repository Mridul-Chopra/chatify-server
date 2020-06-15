const hash = require('object-hash');

module.exports = (app,io)=>{

    var users = [];
    var connections =[];

    io.on('connection',(socket)=>{ // connect to the socket
        socket.on('message',(data)=>{ // on some message is received
            io.sockets.emit('received-message',data); // emit new event broadcasting the message
        })

        socket.on('newUser',(data)=>{  // whenever new user is connected
            let  id = hash(socket);
            users.push(data); // push the user to the list of users
            connections.push(socket); // push the socket in the connections

            io.sockets.emit('users',users); // send the updated information to all the clients
        });

        socket.on('disconnect',(data)=>{
            let index = connections.indexOf(socket); // get the index of the connection and the user
            connections.splice(index,1); // remove the connections from the list
            users.splice(index,1); // remove the user from the list

            io.sockets.emit('users',users); // send the updated information to all the clients
        });
    })



    
}