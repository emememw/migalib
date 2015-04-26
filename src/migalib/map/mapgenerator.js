var MapGenerator = module.exports = {};

var Globals = require("../core/globals");
var WallTile = require("../tile/walltile");
var Tile = require("../tile/tile");




MapGenerator.generate = function(width, height) {
	var tiles = [];
	for(var x = 0; x < width; x++) {
		tiles[x] = [];
		for(var y = 0; y < height; y++) {
			if(x === 0 || x === width -1 || y === 0 || y === height-1) {
				tiles[x][y] = new WallTile(x*Globals.tileSize, y*Globals.tileSize);
			}  else if(x === 10 && y === 10) {
				tiles[x][y] = new WallTile(x*Globals.tileSize, y*Globals.tileSize); 
			} else if(x === 12 && y === 10) {
				tiles[x][y] = new WallTile(x*Globals.tileSize, y*Globals.tileSize); 
			} else if(x > 14 && x < 25 && y === 10) {
				tiles[x][y] = new WallTile(x*Globals.tileSize, y*Globals.tileSize); 
			} 
			else {
				tiles[x][y] = new Tile(x*Globals.tileSize, y*Globals.tileSize);
			}
		}
	}
	return tiles;
};


