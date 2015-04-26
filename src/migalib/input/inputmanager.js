var InputManager = module.exports = {};

var Globals = require("../core/globals");
var Keys = require("./keys");
var Renderer = require("../render/renderer");



	InputManager.keys = [];
	InputManager.clickCoord = {x : 0, y : 0};
	InputManager.justClicked = false;

	InputManager.init = function() {
		window.onkeyup = InputManager.keyup;
		window.onkeydown = InputManager.keydown
		Globals.canvas.onclick = InputManager.click;
	}; 

	InputManager.keydown = function(event) {
		if(InputManager.keys[event.keyCode] === undefined) {
			InputManager.keys[event.keyCode] = true;
		}
		if(event.keyCode !== Keys.f5) {
			event.preventDefault();
		}
	};

	InputManager.keyup = function(event) {
		InputManager.keys[event.keyCode] = undefined; 
		if(event.keyCode !== Keys.f5) {
			 event.preventDefault();
		}
	};

	InputManager.click = function(event) {
		InputManager.justClicked = true;
		var offsetH = Renderer.translateX(0);
		var offsetV = Renderer.translateY(0);

		var x = parseInt((event.offsetX/Renderer.zoom) - offsetH);
		var y = parseInt((event.offsetY/Renderer.zoom) - offsetV);
		
		InputManager.clickCoord = { "x" : parseInt(x/Globals.tileSize), "y" : parseInt(y/Globals.tileSize)};
	};

	InputManager.isKeyPressed = function(keyCode) {
		return InputManager.keys[keyCode] === undefined || !InputManager.keys[keyCode] ? false : true;
	};

	InputManager.resetKey = function(keyCode) {
		InputManager.keys[keyCode] = false;
	}; 

	InputManager.update = function(delta) {
		InputManager.justClicked = false;
	};


