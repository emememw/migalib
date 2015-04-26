var ResourceManager = module.exports = {};



ResourceManager.sounds = [];
ResourceManager.music = [];
ResourceManager.images = [];

ResourceManager.init = function() {
	ResourceManager.loadSounds();	
	ResourceManager.loadMusic();
	ResourceManager.loadImages();
};

ResourceManager.loadSounds = function() {
	ResourceManager.sounds["test"] = new Audio("res/sound/block.wav")
};

ResourceManager.loadMusic = function() {
	ResourceManager.music["test"] = new Audio("res/music/test.wav");
};

ResourceManager.loadImages = function() {
	ResourceManager.images["tiles"] = new Image();
	ResourceManager.images["tiles"].src = "res/images/tiles.png";
	ResourceManager.images["sprites"] = new Image();
	ResourceManager.images["sprites"].src = "res/images/sprites.png";
};


