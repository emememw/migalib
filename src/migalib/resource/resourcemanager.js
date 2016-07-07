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
};

ResourceManager.loadImage = function loadImage(identifier, source) {
	const image = new Image();
	image.src = source;
	ResourceManager[identifier] = image;
};


