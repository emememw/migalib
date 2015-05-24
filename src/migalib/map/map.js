module.exports = Map;

var MapGenerator = require("./mapgenerator");
var Globals = require("../core/globals");
var astar = require("../lib/astar");

function Map(width, height) {
	this.tiles = [];
	this.width = width;
	this.height = height;

	(function generate(map) {
		map.tiles = MapGenerator.generate(map.width, map.height);
	})(this);

	this.graph = this.generateGraph();
	
}

Map.prototype.render = function(delta) {
	for(var x = 0; x < this.tiles.length; x++) {
		for(var y = 0; y < this.tiles[x].length; y++) {
			this.tiles[x][y].render(x*Globals.tileSize, y*Globals.tileSize, delta);
		}
	}
}

Map.prototype.update = function(delta) {
	for(var x = 0; x < this.tiles.length; x++) {
		for(var y = 0; y < this.tiles[x].length; y++) {
			this.tiles[x][y].update(delta);
		}
	}
}

Map.prototype.generateGraph = function() {
	var matrix = [];	
    for(var x = 0; x < this.tiles.length; x++) {
		matrix[x] = [];
		for(var y = 0; y < this.tiles[x].length; y++) { 
			if(this.tiles[x][y].accessible) {
				matrix[x][y] = 1;
			} else {
				matrix[x][y] = 0; 
			}
			
		}
	}
	this.matrix = matrix;
	return new astar.Graph(matrix, { diagonal : false});
}

Map.prototype.getTilesAtPosition = function(rect) {
	var result = [];
	var startX = parseInt((rect.x-rect.width)/Globals.tileSize);
	if(startX < 0) {
		startX = 0;
	}
	var endX = parseInt((rect.x+rect.width)/Globals.tileSize)+1;
	if(endX > this.tiles.length) {
		endX = this.tiles.length;
	}
	var startY = parseInt((rect.y-rect.height)/Globals.tileSize);
	if(startY < 0) {
		startY = 0;
	}
	var endY = parseInt((rect.y+rect.height)/Globals.tileSize)+1;
	if(endY > this.tiles[0].length) {
		endY = this.tiles[0].length;
	}
	for(var x = startX; x < endX; x++) {
		for(var y = startY; y < endY; y++) { 
			if(this.tiles[x][y].intersects(rect)) {
				result.push(this.tiles[x][y]);
			}
		}
	}
	return result;
}



