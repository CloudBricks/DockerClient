const DockerController = require("./Controllers/DockerController");

const controller = new DockerController();

controller.createBlock({ Image: "hello-world", name: "hello-world-block" })
    .then(function() {
        console.log('created');
        controller.stopBlock({ name: "hello-world-block" })
            .then(function() {
                console.log('removed');
            })
            .catch(function(err) {
                console.log('failed: ' + err);
            })
    })
    .catch(function(err) {
        console.log('failed: ' + err);
    });