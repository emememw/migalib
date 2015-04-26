var MapManager = module.exports = {};


MapManager.currentMap = undefined;

MapManager.render = function(delta) {
	if(MapManager.currentMap !== undefined) {
		MapManager.currentMap.render(delta);
	}
};

MapManager.update = function(delta) {
	if(MapManager.currentMap !== undefined) {
		MapManager.currentMap.update(delta);
	}
};

