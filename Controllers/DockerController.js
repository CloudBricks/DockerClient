const Docker = require("dockerode");


function DockerController() {
    this.docker = new Docker();
    this.blocks = { test: 'test' };
}
DockerController.prototype.createBlock = function(options) {
    const self = this;
    const containerConfig = {
        Image: options.Image,
        name: options.name
    }
    console.log(`Block ${options.name} is being created.`);
    return this.docker.createContainer(containerConfig)
        .then(function(container) {
            console.log(`Block ${options.name} successfully created.`);
            return container.start();
        })
        .then(function(container) {
            self.blocks[options.name] = container.id;
            console.log(`Block ${options.name} successfully started.`);
        })
}

DockerController.prototype.stopBlock = function(options) {
    const self = this;

    const container = this.docker.getContainer(self.blocks[options.name]);
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