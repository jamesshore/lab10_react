// Copyright (c) 2012-2014 Titanium I.T. LLC. All rights reserved. See LICENSE.txt for details.
/*global desc, task, jake, fail, complete, directory, require, console, process */
(function () {
	"use strict";

	// Uncomment and modify the following list to cause the build to fail unless these browsers are tested.
	var REQUIRED_BROWSERS = [
//		"IE 8.0.0 (Windows XP)",
//		"IE 9.0.0 (Windows 7)",
//		"Firefox 23.0.0 (Mac OS X 10.8)",
//		"Chrome 29.0.1547 (Mac OS X 10.8.5)",
//		"Safari 6.0.5 (Mac OS X 10.8.5)",
//		"Mobile Safari 6.0.0 (iOS 6.1)"
	];

	var shell = require("shelljs");
	var jshint = require("simplebuild-jshint");

	var karma = require("./build/util/karma_runner.js");
	var jsx = require("./build/util/jsx_runner.js");
	var browserify = require("./build/util/browserify_runner.js");

	var GENERATED_DIR = "generated";
	var JSX_DIR = GENERATED_DIR + "/jsx";
	var BROWSERIFY_DIR = GENERATED_DIR + "/browserify";
	var DEPLOY_DIR = GENERATED_DIR + "/deploy";

	directory(JSX_DIR);
	directory(BROWSERIFY_DIR);
	directory(DEPLOY_DIR);

	desc("Delete generated files");
	task("clean", function() {
		jake.rmRf(GENERATED_DIR);
	});

	desc("Lint, test, and build");
	task("default", ["lint", "test", "build"], function() {
		console.log("\n\nOK");
	});

	desc("Start Karma server -- run this first");
	task("karma", function() {
		karma.serve(complete, fail);
	}, {async: true});

	desc("Create deployable client files");
	task("build", [ DEPLOY_DIR, "browserify" ], function() {
		console.log("Building deploy dir: .");
		shell.rm("-rf", DEPLOY_DIR + "/*");
		shell.cp("-R", "src/client/*.html", BROWSERIFY_DIR + "/*", DEPLOY_DIR);
	});

	desc("Lint everything");
	task("lint", ["lintNode", "lintJsx"]);

	task("lintNode", function() {
		process.stdout.write("Linting Node.js code: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/*.js", "src/server/**/*.js", "build/util/**/ *.js" ],
			options: nodeLintOptions(),
			globals: nodeLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintJsx", [ "compileJsx" ], function() {
		process.stdout.write("Linting JSX code: ");
		jshint.checkFiles({
			files: [ JSX_DIR + "/**/*.js" ],
			options: jsxLintOptions(),
			globals: jsxLintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Test everything");
	task("test", [ /* TBD */ ]);

	task("compileJsx", [ JSX_DIR ], function() {
		process.stdout.write("Compiling JSX to JS: ");
		shell.rm("-rf", JSX_DIR + "/*");
		var pass = jsx.transformFiles(jsxFiles(), JSX_DIR);
		if (!pass) fail("JSX failed");
	});

	task("browserify", [ BROWSERIFY_DIR, "compileJsx" ], function() {
		process.stdout.write("Bundling client files with Browserify: ");
		browserify.bundle(JSX_DIR, compiledJsxFiles(), "./main.js", BROWSERIFY_DIR + "/bundle.js", complete, fail);
	}, { async: true });

	function jsxFiles() {
		var files = new jake.FileList();
		files.include("src/client/**/*.jsx");
		return files.toArray();
	}

	function compiledJsxFiles() {
		var files = new jake.FileList();
		files.include(JSX_DIR + "/*");
		return files.toArray();
	}

	function globalLintOptions() {
		return {
			bitwise:true,
			curly:false,
			eqeqeq:true,
			forin:true,
			immed:true,
			latedef:false,
			newcap:true,
			noarg:true,
			noempty:true,
			nonew:true,
			regexp:true,
			undef:true,
			strict:true,
			trailing:true
		};
	}

	function nodeLintOptions() {
		var options = globalLintOptions();
		options.node = true;
		return options;
	}

	function jsxLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		options.newcap = false;
		return options;
	}

	function nodeLintGlobals() {
		return {
			// Mocha globals
			beforeEach: false,
			afterEach: false,
			describe: false,
			it: false
		};
	}

	function jsxLintGlobals() {
		return {
			React: false,

			// CommonJS
			exports: false,
			require: false,
			module: false
		};
	}

}());