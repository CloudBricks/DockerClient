var io_client = require('socket.io-client');

const socket = io_client('http://localhost');
socket.on('test', function(data) {
    console.log(data);
    socket.emit('response', { my: 'data' });
});