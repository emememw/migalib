var fs = require("fs");
var rimraf = require("rimraf");
var exec = require('child_process').exec;
var fsextra = require("fs.extra");

console.log("Building ... ");
console.log("Deleting directory ./dist")
rimraf("dist", function() {
	console.log("Creating directory ./dist ... ")
	fs.mkdir("dist", function() {
		console.log("Executing browserify ... ");
		exec("browserify ./src/migalib/core/migalib.js --standalone migali > dist/migalib.js", function(error, stdout, stderr) {
			if(error !== null || stdout !== "" || stderr !== "") {
				console.log(error, stdout, stderr);
			}
			console.log("Done! :D");
		});
	});
});
