/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var fs = require("fs");
var browserify = require("browserify");

exports.bundle = function(baseDir, inFileList, mainFilename, outFilename, success, failure) {
	var b = browserify({
		debug: true,
		basedir: baseDir
	});

	inFileList.forEach(function(file) {
		process.stdout.write(".");

		file = file.replace(baseDir + "/", "./");
		if (file === mainFilename) b.add(file);
		else b.require(file);
	});
	b.bundle(function(err, bundle) {
		process.stdout.write("\n");
		if (err) return failure(err);
		fs.writeFileSync(outFilename, bundle);
		return success();
	});
}