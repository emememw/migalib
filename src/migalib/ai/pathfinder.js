var Pathfinder = module.exports = {};

var Globals = require("../core/globals");
var MapManager = require("../map/mapmanager");
var astar = require("../lib/astar");


Pathfinder.aStar = function(startX, startY, endX, endY) {

		startX = parseInt((startX+Globals.tileSize/2)/Globals.tileSize);
		startY = parseInt((startY+Globals.tileSize/2)/Globals.tileSize);
		endX = parseInt((endX+Globals.tileSize/2)/Globals.tileSize);
		endY = parseInt((endY+Globals.tileSize/2)/Globals.tileSize);

		var graph = MapManager.currentMap.graph;
		return astar.astar.search(graph, graph.grid[startX][startY], graph.grid[endX][endY]);
};


