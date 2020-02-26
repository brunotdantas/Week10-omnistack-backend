const socketIo = require('socket.io');

exports.setupWebsocket = (server) => {
    const io = socketIo(server);

    io.on('connection', socket =>{
        console.log(socket.id);
    })

}