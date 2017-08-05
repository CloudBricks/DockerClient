const DockerController = require("./Controllers/DockerController");
const io = require("socket.io-client");

const controller = new DockerController();

const socket = io('http://localhost:9092');
socket.on('test', function(data) {
    console.log(data);
});

socket.emit("messageevent", {
    tag: 'test',
    content: 'hellworld'
});

// controller.createBlock({ Image: "hello-wsorld", name: "hello-world-block" })
//     .then(function() {
//         console.log('created');
//         controller.stopBlock({ name: "hello-world-block" })
//             .then(function() {
//                 console.log('removed');
//             })
//             .catch(function(err) {
//                 console.log('failed: ' + err);
//             })
//     })
//     .catch(function(err) {
//         console.log('failed: ' + err);
//     });