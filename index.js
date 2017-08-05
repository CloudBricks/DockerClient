const DockerController = require("./Controllers/DockerController");
const controller = new DockerController();


// controller.createBlock({ Image: "hello-wsorld", name: "hello-world-block", })
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
const socketServerOpt = {
    Image: "socketserver",
    NetworkingConfig: {
        EndpointsConfig: {
            "scratch_docker": {}
        }
    },
    name: "socketserver"
};

const httpBodyOpt = {
    Image: "httpbody",
    NetworkingConfig: {
        EndpointsConfig: {
            "scratch_docker": {}
        }
    },
    Portbindings: { "8080/tcp": [{ HostPort: '8080' }] },
    "Env": [
        "ID=1",
        "LISTEN=2"
    ],
    name: "httpbody"

}
const transformUpperCaseOpt = {
    Image: "transformuppercase",
    NetworkingConfig: {
        EndpointsConfig: {
            "scratch_docker": {}
        }
    },
    "Env": [
        "ID=2",
        "LISTEN=1"
    ],
    name: "transformuppercase"

}

//Portbindings: { "8080/tcp": [{ '8080' }] },
controller.createBlock(socketServerOpt)
    .then(function() {
        return controller.createBlock(httpBodyOpt);
    })
    .then(function() {
        return controller.createBlock(transformUpperCaseOpt);
    })
    .catch(function(err) {
        console.log("Error Created SocketServer: " + err);
    })