var EffectManager = module.exports = {};

EffectManager.effects = [];

EffectManager.update = function(delta) {

	for(var i = 0; i < EffectManager.effects.length; i++) {
		if(EffectManager.effects[i].isDead()) {
			EffectManager.effects.splice(i,1);
		} else {
			EffectManager.effects[i].update(delta);
		}
	}

};

EffectManager.render = function() {

	EffectManager.effects.forEach(function(effect) {
		effect.render();
	});


};


