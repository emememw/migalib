module.exports = ParticleEmitter;

var TextureArea = require("../render/texturearea");
var ResourceManager = require("../resource/resourcemanager");
var Particle = require("../particle/particle");


function ParticleEmitter(options) {

	this.x = options.x;
	this.y = options.y;
	this.emissionRate = options.emissionRate;
	this.originalEmissionRate = options.emissionRate;
	this.life = options.life;
	this.lifeRandom = options.lifeRandom;
	this.amount = options.amount;
	this.amountRandom = options.amountRandom;
	this.speed = options.speed;
	this.speedRandom = options.speedRandom;
	this.angleMin = options.angleMin;
	this.angleMax = options.angleMax;
	this.offset = options.offset;
	this.particles = [];

}


ParticleEmitter.prototype.createParticle = function() {
	
 	var textureArea = new TextureArea(ResourceManager.images["sprites"], 2, 0); 
	var x = this.x + (Math.random() * this.offset);
	var y = this.y + (Math.random() * this.offset);
	var velocity = 1.0 * (Math.random() * (this.speed + this.speedRandom) - this.speed);
	var gravity = 1.0 * (Math.random() * 2 -1);
	var angle = (Math.random() * this.angleMax) + this.angleMin;
	var angleVelocity = 0.1 * ((Math.random() * 5) -5);
	var color = undefined;
	var size = ~~(Math.random() * 1.2 + 0.5);
	var sizeFactor = (Math.random() * 0.75 + 0.5).toFixed(2);
	var opacity = Math.random().toFixed(2);
	var fade = 0.96;
	var blendType = false;
	var lifeTime = ~~(Math.random() * (this.life+this.lifeRandom) + this.life);

	return new Particle(x,y, textureArea, velocity, angle, angleVelocity, gravity, color, size, sizeFactor, opacity, fade, blendType, lifeTime);
}

ParticleEmitter.prototype.update = function(delta) {
	this.emissionRate--;

	if(this.emissionRate <= 0) {
		var i = ~~(Math.random() * (this.amount + this.amountRandom)+ this.amount);
		for(; i > 0; i--) {
			this.particles.push(this.createParticle());
		}

		this.emissionRate = this.originalEmissionRate;
	}

	var i = 0;
	for(; i < this.particles.length; i++) {
		
        if(this.particles[i].isDead()) {
			this.particles.splice(i, 1);
			i--;
		} else {
			this.particles[i].update(delta);
		}

	}

}

ParticleEmitter.prototype.render = function() {
	this.particles.forEach(function(particle) {
		particle.render();
	});
}


