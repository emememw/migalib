module.exports = WallTile;

var Tile = require("./tile");
var TextureArea = require("../render/texturearea");
var ResourceManager = require("../resource/resourcemanager");

function WallTile(x, y) {
	Tile.call(this); 
	this.x = x;
	this.y = y;
	this.accessible = false;
	this.textureArea = new TextureArea(ResourceManager.images["tiles"], 4, 0);

};

WallTile.prototype = new Tile;
WallTile.prototype.constructor = WallTile;
WallTile.prototype.parentClass = Tile.prototype; 

WallTile.prototype.render = function(x, y, delta) {
	WallTile.prototype.parentClass.render.apply(this, arguments); 
}
