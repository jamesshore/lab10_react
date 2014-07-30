/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var jsx = require("react-tools");
var fs = require("fs");
var path = require("path");
var shell = require("shelljs");

exports.transformFiles = function(baseDir, fileList, outputDir, options) {
	var pass = true;
	fileList.forEach(function(inFilename) {
		process.stdout.write(".");
		var outFilename = outputDir + "/" + inFilename.replace(baseDir + "/", "");
		outFilename = path.dirname(outFilename) + "/" + path.basename(inFilename, path.extname(inFilename)) + ".js";
		pass = transformOneFile(inFilename, outFilename) && pass;
	});
	process.stdout.write("\n");
	return pass;
};

function transformOneFile(inFilename, outFilename, options) {
	try {
		var input = fs.readFileSync(inFilename, { encoding: "utf8" });
		var output = jsx.transform(input, options);
		shell.mkdir("-p", path.dirname(outFilename));
		fs.writeFileSync(outFilename, output, { encoding: "utf8" });
		return true;
	}
	catch(error) {
		console.log(error);
		console.log("\n" + inFilename + " failed");
		console.log("line " + error.lineNumber + ", col " + error.column + ": " + error.description);
		return false;
	}
}
