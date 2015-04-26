var ParticleManager = module.exports = {};



ParticleManager.emitter = [];

ParticleManager.update = function(delta) {
	ParticleManager.emitter.forEach(function(emitter) {
		emitter.update(delta);
	});
};

ParticleManager.render = function() {
	ParticleManager.emitter.forEach(function(emitter) {
		emitter.render();
	});
};


