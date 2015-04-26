module.exports = GameScreen; 

var Screen = require("./screen");
var MapManager = require("../map/mapmanager");
var ParticleManager = require("../particle/particlemanager");
var EntityManager = require("../entity/entitymanager");
var EffectManager = require("../effect/effectmanager");

function GameScreen() {
}

GameScreen.prototype = new Screen;
GameScreen.prototype.constructor = GameScreen;
GameScreen.prototype.parentClass = Screen.prototype; 

GameScreen.prototype.update = function(delta) {
	MapManager.update(delta);
	ParticleManager.update(delta);
	EntityManager.update(delta);
	EffectManager.update(delta);
}

GameScreen.prototype.render = function(delta) {
	MapManager.render(delta);
	ParticleManager.render(delta);
	EntityManager.render(delta);
	EffectManager.render();
}

