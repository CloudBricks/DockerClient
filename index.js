const socket = require('socket.io-client')('http://localhost:9092');


const DockerController = require("./Controllers/DockerController");
const controller = new DockerController();
const socketServerOpt = {
    Image: "socketserver",
    NetworkingConfig: {
        EndpointsConfig: {
            "scratch_docker": {}
        }
    },
    Portbindings: { "8080/tcp": [{ HostPort: '9092' }] },
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

controller.createBlock(socketServerOpt)
    .catch(function(err) {
        console.log("Error Created SocketServer: " + err);
    }).then(function() {
        socket.on('connect', function() {
            console.log('Connected');

        });
        socket.on('disconnect', function() {
            console.log('disconnected');
        });

        socket.on("updatecontainer", function(data) {
            controller.stopAllBlocks();
            setTimeout(function() {
                console.log("waiting for all containers to stop", 8000);
            })
            for (var i = 0; i < data.length; ++i) {
                switch (data[i].title) {
                    case 'httpbodyserver':
                        httpBodyOpt.Env = [
                            `ID=${i}`,
                            `LISTEN=${(i+1==data.length)?0:i+1}`
                        ]
                        console.log(JSON.stringify(httpBodyOpt))
                        controller.createBlock(httpBodyOpt);
                        break;
                    case 'touppercaseserver':
                        transformUpperCaseOpt.Env = [
                            `ID=${i}`,
                            `LISTEN=${(i+1==data.length)?0:i+1}`
                        ]
                        console.log(JSON.stringify(transformUpperCaseOpt))
                        controller.createBlock(transformUpperCaseOpt);
                        break;
                    default:
                        console.log("unimplemented block");
                }
            }
        });

        socket.on("deleteallcontainers", function(data) {
            controller.stopAllBlocks();
        })



        // function terminateAllContainers() {
        //     var promises = [];
        //     for (var name in controller.blocks) {
        //         if (controller[name]) {
        //             promises.push(controller.stopBlock({ name: name })
        //                 .catch(function(err) {
        //                     console.log(err);
        //                 }));
        //         }
        //     }
        //     Promise.all(promises).then(function() {
        //         process.exit();
        //     })

        // }
        // process.on('exit', terminateAllContainers);
        // process.on('SIGINT', terminateAllContainers);
        // process.on('uncaughtException', terminateAllContainers);



    })
    .catch(function(err) {
        console.log("Error creating socket server " + err);
    });

//Portbindings: { "8080/tcp": [{ '8080' }] },
// controller.createBlock(socketServerOpt)
//     .then(function() {
//         return controller.createBlock(httpBodyOpt);
//     })
//     .then(function() {
//         return controller.createBlock(transformUpperCaseOpt);
//     })
//     .catch(function(err) {
//         console.log("Error Created SocketServer: " + err);
//     })