module.exports = Player; 
var Entity = require("./entity");
var Globals = require("../core/globals");
var TextureArea = require("../render/texturearea");
var ResourceManager = require("../resource/resourcemanager");
var InputManager = require("../input/inputmanager");
var Keys = require("../input/keys");
var Directions = require("../util/directions");
var EntityManager = require("./entitymanager"); 


function Player(x, y) {
	Entity.call(this, x, y, Globals.tileSize, Globals.tileSize);
	this.textureArea = new TextureArea(ResourceManager.images["sprites"], 0, 0);
	this.test = false;
}


Player.prototype = new Entity;
Player.prototype.constructor = Player;
Player.prototype.parentClass = Entity.prototype;

Player.prototype.update = function(delta) {
	if(InputManager.isKeyPressed(Keys.rightarrow)) {
		this.move(Directions.right, 256, delta);
	} else if(InputManager.isKeyPressed(Keys.leftarrow)) { 
		this.move(Directions.left, 256, delta); 
	}  
	if(InputManager.isKeyPressed(Keys.uparrow)) { 
		this.move(Directions.up, 256, delta);  
	} else if(InputManager.isKeyPressed(Keys.downarrow)) { 
		this.move(Directions.down, 256, delta);
	}
	if(InputManager.isKeyPressed(Keys.enter)) {
		ResourceManager.sounds["test"].play();
		this.test = !this.test;
		InputManager.resetKey(Keys.enter);
	}
	
}

Player.prototype.render = function(delta) {
	Player.prototype.parentClass.render.apply(this, [delta, this.test]);
	/*Globals.context.save();
	Globals.context.translate(Renderer.translateX(this.x)*Renderer.zoom, Renderer.translateY(this.y)*Renderer.zoom);
	Globals.context.rotate(this.test * Math.PI/180);
	Renderer.render(this.textureArea, this.x, this.y, this.width, this.height, true);
	Globals.context.restore();*/
}

