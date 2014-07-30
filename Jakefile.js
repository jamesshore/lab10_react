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

	var mocha = require("./build/util/mocha_runner.js");
	var karma = require("./build/util/karma_runner.js");
	var jsx = require("./build/util/jsx_runner.js");

	var GENERATED_DIR = "generated";
	var JS_DIR = GENERATED_DIR + "/js";
	var DEPLOY_DIR = GENERATED_DIR + "/deploy";

	directory(JS_DIR);
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
	task("build", [ DEPLOY_DIR, "compileJsx" ], function() {
		console.log("Building deploy dir: ...");
		shell.rm("-rf", DEPLOY_DIR + "/*");
		shell.cp("-R", "src/client/*.html", JS_DIR + "/*", DEPLOY_DIR);
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
			files: [ JS_DIR + "/**/*.js" ],
			options: jsxLintOptions(),
			globals: jsxLintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Test everything");
	task("test", ["testServer"/*, "testClient" */ ]);

	task("testServer", function() {
		process.stdout.write("Testing Node.js code: ");
		mocha.runTests(nodeFilesToTest(), complete, fail);
	}, { async: true} );

	task("testClient", function() {
		process.stdout.write("Testing front-end code: ");
		karma.runTests(REQUIRED_BROWSERS, complete, fail);
	}, { async: true} );

	task("compileJsx", [JS_DIR], function() {
		process.stdout.write("Compiling JSX to JS: ");
		var pass = jsx.transformFiles(jsxFiles(), JS_DIR);
		if (!pass) fail("JSX failed");
	});

	function jsxFiles() {
		var files = new jake.FileList();
		files.include("src/client/**.jsx");
		return files.toArray();
	}

	function nodeFilesToTest() {
		var testFiles = new jake.FileList();
		testFiles.include("src/_*_test.js");
		testFiles.include("src/server/**/_*_test.js");
		testFiles.exclude("node_modules");
		var tests = testFiles.toArray();
		return tests;
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
			React: false
		};
	}

}());