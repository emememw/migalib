module.exports = Entity; 

var Rect = require("../util/rect");
var Globals = require("../core/globals");
var Renderer = require("../render/renderer");
var Directions = require("../util/directions");
var MapManager = require("../map/mapmanager");
var EntityManager = require("./entitymanager");


function Entity(x, y, width, height) {
	Rect.call(this);
	this.boxScale = 0.1;
	this.originalX = x;
	this.originalY = y;
	this.originalWidth = width;
	this.originalHeight = height;
	this.x = x + width * this.boxScale;
	this.y = y + height * this.boxScale;
	this.width = width - width* this.boxScale*2;
	this.height = height - height* this.boxScale*2;
	this.tilesIndexX = 0;
	this.tilesIndexY = 0;
	this.textureArea = undefined;
}

Entity.prototype = new Rect;
Entity.prototype.constructor = Entity;
Entity.prototype.parentClass = Rect.prototype; 

Entity.prototype.render = function(delta, flipped) {
	/*Globals.context.fillStyle = "#0000FF";
	Globals.context.fillRect(this.x - this.originalWidth*this.boxScale, this.y - this.originalHeight*this.boxScale, this.originalWidth, this.originalHeight); 
	Globals.context.fillStyle = "#FF33FF";
	Globals.context.fillRect(this.x, this.y, this.width, this.height);*/
	//Globals.context.drawImage(ResourceManager.images["sprites"], this.tilesIndexX*Globals.splitSize,this.tilesIndexY*Globals.splitSize,Globals.splitSize,Globals.splitSize, this.x - this.originalWidth*this.boxScale, this.y - this.originalHeight*this.boxScale, this.originalWidth, this.originalHeight); 
                               
	if(flipped) {
		Globals.context.save();
		Globals.context.translate(Renderer.translateX(this.x)*Renderer.getZoom(),0);
		Globals.context.scale(-1, 1);
		Renderer.render(this.textureArea, (this.x - this.originalWidth*this.boxScale), this.y - this.originalHeight*this.boxScale, this.originalWidth, this.originalHeight, true); 
		Globals.context.restore();
	} else {
		Renderer.render(this.textureArea, this.x - this.originalWidth*this.boxScale, this.y - this.originalHeight*this.boxScale, this.originalWidth, this.originalHeight);  
	}
	
	
}


Entity.prototype.moveTowardPoint = function(pointX, pointY, velocity, delta) {

		if(this.x < pointX) {
			if(this.x + velocity*delta > pointX) {
			   this.x = pointX;
			} else { 
				this.move(Directions.right, velocity, delta);
			}
		} else if(this.x > pointX) {
			if(this.x - velocity*delta < pointX) {
				this.x = pointX;
			} else { 
				this.move(Directions.left, velocity, delta);
			}
		}

		if(this.y < pointY) {
			if(this.y + velocity*delta > pointY) {
				this.y = pointY;
			} else { 
				this.move(Directions.down, velocity, delta);
			}

		} else if(this.y > pointY) {
			if(this.y - velocity*delta < pointY) {
				this.y = pointY;
			} else { 
			this.move(Directions.up, velocity, delta);
			}
		}


}


Entity.prototype.move = function(direction, velocity, delta) {
	var newX = this.x;
	var newY = this.y
	if(direction === Directions.right) {
		newX = this.x + velocity * delta;
		
	} else if(direction === Directions.left) {
		newX = this.x - velocity * delta;
	} else if(direction === Directions.down) {
		newY = this.y + velocity * delta;
	} else if(direction === Directions.up) {
		newY = this.y - velocity * delta;
	}
	if(!this.checkIfCollidingWithTile(newX, newY)) {
		this.x = newX;
		this.y = newY;
		this.checkIfCollidingWithEntity(newX, newY);
	} else {
		if(direction === Directions.right) {
			this.x = parseInt((newX+this.width)/Globals.tileSize)*Globals.tileSize-this.width;
		} else if(direction === Directions.left) {
			this.x = parseInt(newX/Globals.tileSize)*Globals.tileSize+Globals.tileSize;
		} else if(direction === Directions.down) {
			this.y = parseInt((newY+this.height)/Globals.tileSize)*Globals.tileSize-this.height;
		} else if(direction === Directions.up) {
			this.y = parseInt(newY/Globals.tileSize)*Globals.tileSize+Globals.tileSize;
		}  
	}
}

Entity.prototype.update = function(delta) {
}

Entity.prototype.checkIfCollidingWithTile = function(newX, newY) {
	var blocked = false;
	var tiles = MapManager.currentMap.getTilesAtPosition(new Rect(newX, newY, this.width, this.height));
	tiles.forEach((function (entity) {
		return function(tile) {
			entity.onTileCollision(tile);
			if(!tile.accessible) {
				blocked = true;
			}
		}
	}(this)));

	return blocked;
}

Entity.prototype.checkIfCollidingWithEntity = function(newX, newY) {
	var entities = EntityManager.getEntitiesAtPosition(this, new Rect(newX, newY, this.width, this.height));
    entities.forEach((function (entity) {
		return function(collidingEntity) {
			entity.onEntityCollision(collidingEntity);
		}
	}(this))); 
}

Entity.prototype.onTileCollision = function(tile) {
}

Entity.prototype.onEntityCollision = function(entity) {
}




