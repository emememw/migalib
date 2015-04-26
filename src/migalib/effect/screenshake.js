module.exports = ScreenShake;

var Effect = require("./effect");
var Renderer = require("../render/renderer");

function ScreenShake(intensity, time, shakeX, shakeY) {

	this.intensity = intensity;
	this.time = time;
	this.shakeX = shakeX;
	this.shakeY = shakeY;
	this.dead = false;
	
}

ScreenShake.prototype = new Effect;
ScreenShake.prototype.constructor = ScreenShake;
ScreenShake.prototype.parentClass = Effect.prototype; 


ScreenShake.prototype.update = function(delta) {

	this.time -= delta;
	if(this.time <= 0) {
		this.dead = true;
		Renderer.cameraOffsetX = 0;
		Renderer.cameraOffsetY = 0;
	} else {

		if(this.shakeX) {
			Renderer.cameraOffsetX = Math.random() * this.intensity;
		}

		if(this.shakeY) {
			Renderer.cameraOffsetY = Math.random() * this.intensity;
		}

	}

}

ScreenShake.prototype.isDead = function() {
	return this.dead;
}

