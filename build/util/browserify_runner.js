/* Copyright (c) 2014 Titanium I.T. LLC - See LICENSE.txt for license */
"use strict";

var fs = require("fs");
var path = require("path");
var browserify = require("browserify");

exports.bundle = function(entryPoint, outFilename, success, failure) {
	var b = browserify({
		debug: true
	});

	b.add(path.resolve(entryPoint));
	b.bundle(function(err, bundle) {
		if (err) return failure(err);
		fs.writeFileSync(outFilename, bundle);
		return success();
	});
};