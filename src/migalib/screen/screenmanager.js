ScreenManager = module.exports = {};


ScreenManager.currentScreen = undefined;

ScreenManager.render = function(delta) {
	if(ScreenManager.currentScreen !== undefined) {
		ScreenManager.currentScreen.render(delta);
	}
};

ScreenManager.update = function(delta) {
	if(ScreenManager.currentScreen !== undefined) {
		ScreenManager.currentScreen.update(delta);
	}
};



