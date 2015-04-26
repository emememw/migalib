var EntityManager = module.exports = {};
var Player = require("./player");

EntityManager.entities = [];

EntityManager.player = undefined;

EntityManager.render = function(delta) {
	EntityManager.entities.forEach(function(entity) {
		if(entity !== EntityManager.player) {
			entity.render(delta);
		}
	});

	EntityManager.player.render(delta); 
};

EntityManager.update = function(delta) {
		EntityManager.player.update(delta);
		EntityManager.entities.forEach(function(entity) {
			if(entity !== EntityManager.player) {
				entity.update(delta);
			}
		});
};

EntityManager.addEntity = function(entity) {
		if(entity instanceof Player) {
			EntityManager.player = entity;
		}
		EntityManager.entities.push(entity);
};

	EntityManager.removeEntity = function(entity) {
		if(entity instanceof Player) {
			EntityManager.player = undefined;
		}
		EntityManager.entities.splice(EntityManager.entities.indexOf(entity), 1);
	};

	EntityManager.getEntitiesAtPosition = function(callingEntity, rect) {
		var result = [];
		EntityManager.entities.forEach(function(entity) {
			if(entity !== callingEntity && entity.intersects(rect)) {
				result.push(entity);
			}
		});
		return result;
	};

	EntityManager.getEntitiesByType = function(entityType) {
		var result = [];
		EntityManager.entities.forEach(function(entity) {
			if(entity instanceof entityType) {
				result.push(entity);
			}
		});
		return result;
	};


