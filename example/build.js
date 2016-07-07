var fs = require("fs");
var rimraf = require("rimraf");
var exec = require('child_process').exec;
var fsextra = require("fs-extra");

console.log("Building ... ");
console.log("Deleting directory ./dist")
rimraf("dist", function() {
	console.log("Creating directory ./dist ... ")
	fs.mkdir("dist", function() {
		fsextra.copySync("./src/html/index.html", "./dist/index.html");
		console.log("Executing browserify ... ");
		exec("./node_modules/browserify/bin/cmd.js ./src/js/game.js --standalone game > dist/game.js", function(error, stdout, stderr) {
			if(error !== null || stdout !== "" || stderr !== "") {
				console.log(error, stdout, stderr);
			}
			console.log("Done! :D");
		});
	});
});
