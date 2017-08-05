function Block(image, id) {
    this.image = image;
    this.id = id;
    this.listenId = undefined;
}
Block.prototype.setListenId = function(listenId) {
    this.listenId = listenId;
}

module.exports = Block;