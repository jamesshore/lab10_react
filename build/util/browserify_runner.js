/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var fs = require("fs");
var browserify = require("browserify");

exports.bundle = function(inFileList, outFilename, success, failure) {
	var b = browserify({ debug: true });

	inFileList.forEach(function(file) {
		process.stdout.write(".");
		b.add("./" + file);
	});
	b.bundle(function(err, bundle) {
		process.stdout.write("\n");
		if (err) return failure(err);
		fs.writeFileSync(outFilename, bundle);
		return success();
	});
}