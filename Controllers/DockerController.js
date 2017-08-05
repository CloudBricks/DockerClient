const Docker = require("dockerode");


class DockerController {
    docker;
    blocks;
    constructor() {
        this.docker = new Docker();
        blocks = {};
    }

    createContainer(options) {
        const containerConfig = {
            Image: options.Image,
            Cmd: options.Cmd
        }
        this.docker.createContainer(containerConfig)
            .then((container) => {
                container.start();
            })
    }
}