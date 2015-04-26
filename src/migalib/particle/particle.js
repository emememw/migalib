module.exports = Particle;

var Globals = require("../core/globals");
var Renderer = require("../render/renderer");

function Particle(x,y, textureArea, velocity, angle, angleVelocity, gravity, color, size, sizeFactor, opacity, fade, blendType, lifetime) {
	this.x = x;
	this.y = y;
	this.textureArea = textureArea;
	this.velocity = velocity;
	this.angle = angle;
	this.angleVelocity = angleVelocity;
	this.gravity = gravity;
	this.color = color;
	this.size = size;
	this.sizeFactor = sizeFactor;
	this.opacity = opacity;
	this.fade = fade;
	this.blendType = blendType;
	this.lifetime = lifetime;
	this.originalLifetime = lifetime;
}

Particle.prototype.update = function(delta) {
	this.lifetime -= delta;
    if(this.lifetime > 0) {
		this.x += this.velocity * delta;
		this.y += this.velocity * delta;

		var ratio = this.lifetime / this.originalLifetime;

		this.angle += this.angleVelocity * delta;

		this.opacity *= this.fade;

		this.size += this.sizeFactor * ratio;

	} else {
		//dead x_x
	}


}

Particle.prototype.render = function() {
	Globals.context.save();
	Globals.context.translate(Renderer.translateX(this.x)*Renderer.zoom, Renderer.translateY(this.y)*Renderer.zoom);
	if(this.blendType !== undefined && this.blendType === true) {
		Globals.context.globalCompositeOperation = "lighter";
	}
	Globals.context.fillStyle = this.color;
	Globals.context.rotate(this.angle*Math.PI/180);
	if(this.opacity !== undefined) {
		//Globals.canvas.globalAlpha(this.opacity);
	}
	Renderer.render(this.textureArea, this.x, this.y, this.size, this.size, true, true);
	Globals.context.restore();
}

Particle.prototype.isDead = function() {
	return (this.lifetime <= 0);
}

