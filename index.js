var Docker = require('dockerode');
var fs = require('fs');

var socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock';
var stats = fs.statSync(socket);

if (!stats.isSocket()) {
    throw new Error('Are you sure the docker is running?');
}

var docker = new Docker({ socketPath: socket });

docker.run('hello-world', [], process.stdout, function(err, data, container) {
    console.log(data.StatusCode);
});
