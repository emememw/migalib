module.exports = Game; 
var ResourceManager = require("../resource/resourcemanager");
var Globals = require("./globals");
var InputManager = require("../input/inputmanager");
var MapManager = require("../map/mapmanager");
var Map = require("../map/map");
var ScreenManager = require("../screen/screenmanager");
var EntityManager = require("../entity/entitymanager");
var Player = require("../entity/player");
var TestNpc = require("../entity/testnpc");
var Renderer = require("../render/renderer");
var ParticleManager = require("../particle/particlemanager");
var ParticleEmitter = require("../particle/particleemiter");
var EffectManager = require("../effect/effectmanager");
var ScreenShake = require("../effect/screenshake");
var GameScreen = require("../screen/gamescreen");

function Game(width, height) {
	this.preparePage(width, height);
	ResourceManager.init();
	InputManager.init();  
}

Game.prototype.preparePage = function preparePage(width, height) {
	document.documentElement.style.height = "100%"
	document.body.style.height = "100%";
	document.body.style.backgroundColor = "#111";
	var wrapperDiv = document.createElement("div");
	wrapperDiv.style.display = "flex";
	wrapperDiv.style.height = "100%";
	wrapperDiv.style.width = "100%";
	wrapperDiv.style.alignItems = "center";
	wrapperDiv.style.justifyContent = "center";
	var canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	wrapperDiv.appendChild(canvas);
	document.body.appendChild(wrapperDiv);
	Globals.canvas = canvas;
	Globals.context = canvas.getContext("2d");
	Globals.context.imageSmoothingEnabled = false;
	Globals.context.mozImageSmoothingEnabled = false;
	Globals.context.webkitImageSmoothingEnabled = false;
	Globals.context.msImageSmoothingEnabled = false;
	Globals.context.imageSmoothingEnabled = false;
}

Game.prototype.init = function() {
	this.start();
}

Game.prototype.start = function() {
	this._startGameLoop();
	/*
	MapManager.currentMap = new Map(250, 250); 
	ScreenManager.currentScreen = new GameScreen(); 
	EntityManager.addEntity(new Player(Globals.tileSize*2, Globals.tileSize*2));
	Renderer.followingEntity = EntityManager.player;
	for(var i = 1; i < 5; i++) {
		EntityManager.addEntity(new TestNpc(Globals.tileSize*i, Globals.tileSize*3));
	}

	ParticleManager.emitter.push( new ParticleEmitter({
		x : 128, 
		y : 128, 
		emissionRate : 5, 
		life: 0.5, 
		lifeRandom : 0.2, 
		amount : 5, 
		amountRandom : 1, 
		speed : 100, 
		speedRandom : 100, 
		angleMin : 1, 
		angleMax : 180, 
		offset : 1
	}));

	EffectManager.effects.push(new ScreenShake(30, 3, true, true)); 
	*/
}

Game.prototype._timestamp = function() {
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

Game.prototype.update = function(delta) {
	ScreenManager.update(delta);
	InputManager.update(delta);
}

Game.prototype.render = function(delta) {
	Globals.context.fillStyle = "#000";
	Globals.context.fillRect(0,0,Globals.canvas.width,Globals.canvas.height);
	ScreenManager.render(delta);

	/*Renderer.renderText(10, 50, "hallo");
	Renderer.renderText(10, 100, "test", false, "#FF00FF");
	Renderer.renderText(10, 200, "test", true, "#FF0000", 30);
	*/

}

Game.prototype._startGameLoop = function() {
	var now;
	var delta = 0;
	last = this._timestamp();
	var frame = function(context) { 
		return function() {
			now = context._timestamp();
			delta = (now - last) / 1000;
			context.update(delta);
			context.render(delta);
			last = now;
			requestAnimationFrame(frame);
		}
	}(this);
	requestAnimationFrame(frame);
};

/*
domready(function() {
	new Game().init();
});
*/

