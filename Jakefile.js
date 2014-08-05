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
	var path = require("path");

	var karma = require("./build/util/karma_runner.js");
	var jsx = require("./build/util/jsx_runner.js");
	var browserify = require("./build/util/browserify_runner.js");

	var GENERATED_DIR = "generated";
	var JSX_DIR = GENERATED_DIR + "/jsx";
	var BROWSERIFY_DIR = GENERATED_DIR + "/browserify";
	var COLLATED_CLIENT_DIR = GENERATED_DIR + "/client";
	var DEPLOY_DIR = GENERATED_DIR + "/deploy";

	var CLIENT_DIR = "src/client";
	var VENDOR_DIR = "src/vendor";

	directory(JSX_DIR);
	directory(BROWSERIFY_DIR);
	directory(COLLATED_CLIENT_DIR);
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
		shell.cp("-R", CLIENT_DIR + "/*.html", CLIENT_DIR + "/*.css", BROWSERIFY_DIR + "/*", VENDOR_DIR, DEPLOY_DIR);
	});

	desc("Lint everything");
	task("lint", ["lintNode", "lintClientJs", "lintClientJsx"]);

	task("lintNode", function() {
		process.stdout.write("Linting Node.js code: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/*.js", "src/server/**/*.js", "build/util/**/*.js" ],
			options: nodeLintOptions(),
			globals: nodeLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClientJs", function() {
		process.stdout.write("Linting client-side JavaScript code: ");
		jshint.checkFiles({
			files: [ CLIENT_DIR + "/**/*.js", "!" + CLIENT_DIR + "/vendor/**/*" ],
			options: clientLintOptions(),
			globals: clientLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClientJsx", [ "compileJsx" ], function() {
		process.stdout.write("Linting JSX code: ");
		jshint.checkFiles({
			files: JSX_DIR + "/**/*.js",
			options: clientLintOptions(),
			globals: clientLintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Test everything");
	task("test", [ "testClient" ]);

	task("testClient", [ "collateClient" ], function() {
		console.log("Testing client code:");
		karma.runTests(REQUIRED_BROWSERS, complete, fail);
	}, { async: true} );

	task("compileJsx", [ JSX_DIR ], function() {
		process.stdout.write("Compiling JSX to JS: ");
		shell.rm("-rf", JSX_DIR + "/*");
		var pass = jsx.transformFiles(CLIENT_DIR, jsxFiles(), JSX_DIR);
		if (!pass) fail("JSX failed");
	});

	task("browserify", [ BROWSERIFY_DIR, "collateClient" ], function() {
		console.log("Bundling client JavaScript with Browserify: .");
		browserify.bundle(COLLATED_CLIENT_DIR + "/main.js", BROWSERIFY_DIR + "/bundle.js", complete, fail);
	}, { async: true });

	task("collateClient", [ COLLATED_CLIENT_DIR, "compileJsx" ], function() {
		process.stdout.write("Collating client-side JavaScript: .");
		shell.rm("-rf", COLLATED_CLIENT_DIR + "/*");
		shell.cp("-R", JSX_DIR + "/*", COLLATED_CLIENT_DIR);

		clientJsFiles().forEach(function(file) {
			process.stdout.write(".");
			var relativeFilename = "/" + file.replace(CLIENT_DIR + "/", "");
			shell.mkdir("-p", path.dirname(COLLATED_CLIENT_DIR + relativeFilename));
			shell.cp(CLIENT_DIR + relativeFilename, COLLATED_CLIENT_DIR + relativeFilename);
		});
		process.stdout.write("\n");
	});

	function jsxFiles() {
		return new jake.FileList(CLIENT_DIR + "/**/*.jsx").toArray();
	}

	function clientJsFiles() {
		return new jake.FileList(CLIENT_DIR + "/**/*.js").toArray();
	}

	function globalLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: false,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			globalstrict: true,     // "global" stricts are okay when using CommonJS modules
			trailing: true
		};
	}

	function nodeLintOptions() {
		var options = globalLintOptions();
		options.node = true;
		return options;
	}

	function clientLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		options.newcap = false;
		return options;
	}

	function globalLintGlobals() {
		return {
			// Mocha
			beforeEach: false,
			afterEach: false,
			describe: false,
			it: false,

			// Expect
			expect: false
		};
	}

	function nodeLintGlobals() {
		return globalLintGlobals();
	}

	function clientLintGlobals() {
		var globals = globalLintGlobals();

		// Karma
		globals.dump = false;

		// CommonJS
		globals.exports = false;
		globals.require = false;
		globals.module = false;

		// React
		globals.React = false;

		return globals;
	}

}());