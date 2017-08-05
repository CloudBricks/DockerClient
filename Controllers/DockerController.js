const Docker = require("dockerode");
const Block = require("../Models/Block");

function DockerController() {
    this.docker = new Docker();
    this.blocks = {};
}
DockerController.prototype.createBlock = function(options) {
    const self = this;
    console.log(`Block ${options.name} is being created.`);
    return this.docker.createContainer(options)
        .then(function(container) {
            console.log(`Block ${options.name} successfully created.`);
            return container.start();
        })
        .then(function(container) {
            self.blocks[options.name] = new Block(options.Image, container.id);
            console.log(`Block ${options.name} successfully started.`);
        })
}

DockerController.prototype.stopBlock = function(options) {
    const self = this;

    const container = this.docker.getContainer(self.blocks[options.name].id);
    console.log(`Block ${options.name} is being removed.`);
    return container.stop()
        .then(function(container) {
            console.log(`Block ${options.name} is stopped.`);
            return container.remove()
        })
        .then(function(data) {
            console.log(`Block ${options.name} is removed.`);
        });
}

module.exports = DockerController;