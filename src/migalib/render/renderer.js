var Renderer = module.exports = {};

var Globals = require("../core/globals");
var MapManager = require("../map/mapmanager");
var FontManager = require("../font/fontmanager");



Renderer.zoom = 2;

Renderer.cameraOffsetX = 0;
Renderer.cameraOffsetY = 0;

Renderer.followingEntity = undefined;

Renderer.render = function(textureArea, x, y, width, height, centeredX, centeredY) {
	if(textureArea !== undefined) {
		if(Renderer.followingEntity !== undefined) {
			if(x >= Renderer.followingEntity.x - Globals.canvas.width/Renderer.getZoom() 
					&& x <= Renderer.followingEntity.x + Globals.canvas.width/Renderer.getZoom()
					&& y >= Renderer.followingEntity.y - Globals.canvas.height/Renderer.getZoom() 
					&& y <= Renderer.followingEntity.y + Globals.canvas.height/Renderer.getZoom()) {
	
				var cameraX = Renderer.translateX(x);
				var cameraY = Renderer.translateY(y);
	
				Globals.context.drawImage(
						textureArea.image,
						textureArea.x * Globals.splitSize,
						textureArea.y * Globals.splitSize,
						Globals.splitSize,
						Globals.splitSize,
						(!centeredX ? cameraX*Renderer.getZoom() : -(width*Renderer.getZoom())) + Renderer.cameraOffsetX,
						(!centeredY ? cameraY*Renderer.getZoom() : -(height*Renderer.getZoom())) + Renderer.cameraOffsetY,
						!centeredX ? width*Renderer.getZoom() : width*Renderer.getZoom(),
						!centeredY ? height*Renderer.getZoom() : height*Renderer.getZoom()
						);
			} 
		} else {
			Globals.context.drawImage(
				textureArea.image,
				textureArea.x * Globals.splitSize,
				textureArea.y * Globals.splitSize,
				Globals.splitSize,
				Globals.splitSize,
				x, y,
				!centeredX ? width*Renderer.getZoom() : width*Renderer.getZoom(),
						!centeredY ? height*Renderer.getZoom() : height*Renderer.getZoom()	
				);
		}
	}

};

Renderer.translateX = function(x) {
	var result = x;
	if(Renderer.followingEntity !== undefined) {
		if(Renderer.followingEntity.x >= Globals.canvas.width/2/Renderer.getZoom()) {
			if(Renderer.followingEntity.x > MapManager.currentMap.tiles.length*Globals.tileSize - Globals.canvas.width/2/Renderer.getZoom()) {
				result -= MapManager.currentMap.tiles.length*Globals.tileSize - Globals.canvas.width/Renderer.getZoom();	
			} else {
				result += Globals.canvas.width/2/Renderer.getZoom() - Renderer.followingEntity.x; 
			}
		}
	}
	return result;
};

Renderer.translateY = function(y) {
	var result = y;
	if(Renderer.followingEntity !== undefined) {
		if(Renderer.followingEntity.y >= Globals.canvas.height/2/Renderer.getZoom()) {
			if(Renderer.followingEntity.y > MapManager.currentMap.tiles[0].length*Globals.tileSize - Globals.canvas.height/2/Renderer.getZoom()) {
				result -= MapManager.currentMap.tiles[0].length*Globals.tileSize - Globals.canvas.height/Renderer.getZoom();	
			} else {
				result += Globals.canvas.height/2/Renderer.getZoom() - Renderer.followingEntity.y; 
			}
		}
	}
	return result;
};

Renderer.renderText = function(x, y, text, relativePosition, color, size) {

	if(size === undefined) {
		size = FontManager.defaultSize;
	}
	if(color === undefined) {
		color = FontManager.defaultColor;
	}
	Globals.context.font = parseInt(size*Renderer.getZoom())+"px "+FontManager.font;
	Globals.context.fillStyle = color;
	Globals.context.fillText(text, (relativePosition ? Renderer.translateX(x) + Renderer.cameraOffsetX : x)*Renderer.getZoom(), (relativePosition ? Renderer.translateY(y) + Renderer.cameraOffsetY : y)*Renderer.getZoom()); 

};

Renderer.getZoom = function() {
	return Globals.canvas.width  / Globals.maxWidth * Renderer.zoom;
};

Renderer.screenShake = function() {

	Globals.canvas.context.save();

	var radius = 30.0;
	var randomAngle = (150 * Math.random() % 60)*Math.PI/180;
	var offsetX = Math.sin(randomAngle) * radius;
	var offsetY = Math.cos(randomAngle) * radius;

	Globals.canvas.context.translate(offsetX, offsetY);

};


