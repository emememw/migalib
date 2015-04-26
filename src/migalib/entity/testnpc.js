module.exports = TestNpc; 
var Entity = require("./entity");
var Globals = require("../core/globals");
var TextureArea = require("../render/texturearea");
var ResourceManager = require("../resource/resourcemanager");
var PathFinder = require("../ai/pathfinder");
var Player = require("./player");
var Renderer = require("../render/renderer");
var EntityManager = require("./entitymanager");

function TestNpc(x, y) {
	Entity.call(this, x, y, Globals.tileSize, Globals.tileSize);
	this.textureArea = new TextureArea(ResourceManager.images["sprites"], 0, 0);
	this.currentPath = [];
}

TestNpc.prototype = new Entity;
TestNpc.prototype.constructor = TestNpc;
TestNpc.prototype.parentClass = Entity.prototype;


TestNpc.prototype.update = function(delta) {

	if(this.currentPath.length > 0) {
		this.moveTowardPoint(this.currentPath[0].x*Globals.tileSize, this.currentPath[0].y*Globals.tileSize, 150, delta);
		if(this.x-  this.currentPath[0].x*Globals.tileSize < 1 && this.y - this.currentPath[0].y*Globals.tileSize < 1) {
			this.currentPath.splice(0,1);
		} 
	} else {
		this.currentPath = PathFinder.aStar(this.x, this.y, EntityManager.player.x, EntityManager.player.y);  
	}
	
}

TestNpc.prototype.onEntityCollision = function(collidingEntity) {
	if(collidingEntity instanceof Player) {
		//this.currentPath = [];
	}
}

TestNpc.prototype.render = function(delta) {
	TestNpc.prototype.parentClass.render.apply(this, arguments); 
	Renderer.renderText(this.x, this.y, "hug me :D", true); 
}

