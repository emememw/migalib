module.exports = Tile;

var Rect = require("../util/rect");
var Globals = require("../core/globals");
var Tile = require("../tile/tile");
var Renderer = require("../render/renderer");


function Tile(x, y) {
	Rect.call(this);
	this.x = x;
	this.y = y;
	this.width = Globals.tileSize;
	this.height = Globals.tileSize;
	this.accessible = true;
	this.textureArea = undefined;
}

Tile.prototype = new Rect;
Tile.prototype.constructor = Tile;
Tile.prototype.parentClass = Rect.prototype; 

Tile.prototype.render = function(x, y, delta) {
	Renderer.render(this.textureArea, this.x, this.y, this.width, this.height);
}

Tile.prototype.update = function(delta) {
}

