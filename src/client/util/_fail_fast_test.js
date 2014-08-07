// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
"use strict";

var failFast = require("./fail_fast.js");
var FailFastException = failFast.FailFastException;

describe("FailFastException", function() {

	it("looks like this", function() {
		try {
			throw new FailFastException(function() {}, "foo");
		}
		catch(e) {
			expect(e.name).to.equal("FailFastException");
			expect(e.constructor).to.equal(FailFastException);
			expect("" + e).to.equal("FailFastException: foo");
		}
	});

});

describe("FailFast", function() {

	it("checks if variable is defined", function() {
		var unlessDefined = wrap(failFast.unlessDefined);

		expect(unlessDefined("foo")).to.not.throwException();
		expect(unlessDefined(null)).to.not.throwException();
		expect(unlessDefined(undefined)).to.throwException(/Required variable was not defined/);
		expect(unlessDefined(undefined, "myVariable")).to.throwException(/Required variable \[myVariable\] was not defined/);
	});

	it("checks if variable is number, string, or array", function() {
		var unlessNumber = wrap(failFast.unlessNumber);
		var unlessString = wrap(failFast.unlessString);
		var unlessArray = wrap(failFast.unlessArray);
		var unlessFunction = wrap(failFast.unlessFunction);

		expect(unlessNumber(0)).to.not.throwException();
		expect(unlessNumber("foo")).to.throwException(/Expected variable to be number, but was string/);
		expect(unlessNumber({})).to.throwException(/Expected variable to be number, but was object/);
		expect(unlessNumber([])).to.throwException(/Expected variable to be number, but was array/);
		expect(unlessNumber(undefined)).to.throwException(/Expected variable to be number, but was undefined/);
		expect(unlessNumber(null)).to.throwException(/Expected variable to be number, but was null/);
		expect(unlessNumber(NaN)).to.throwException(/Expected variable to be number, but was NaN/);

		expect(unlessNumber("foo", "name")).to.throwException(/Expected variable \[name\] to be number, but was string/);

		expect(unlessString(null, "name")).to.throwException(/Expected variable \[name\] to be string, but was null/);
		expect(unlessArray(null, "name")).to.throwException(/Expected variable \[name\] to be array, but was null/);
		expect(unlessFunction(null, "name")).to.throwException(/Expected variable \[name\] to be function, but was null/);
	});

	it("checks if variable is object of specific type", function() {
		function Example1() {}
		function Example2() {}
		function NoConstructor() {}
		delete NoConstructor.constructor;
		var Anon = function() {};
		var unlessObject = wrap(failFast.unlessObject);

		expect(unlessObject(new Example1())).to.not.throwException();
		expect(unlessObject(new Example1(), Example1)).to.not.throwException();

		expect(unlessObject(null, Example1)).to.throwException(/Expected variable to be object, but was null/);
		expect(unlessObject(new Example1(), Example2)).to.throwException(/Expected object to be (Example2 instance|a specific type)(, but was Example1)?/);
		expect(unlessObject(new Anon(), Example2)).to.throwException(/Expected object to be (Example2 instance|a specific type)/);
		expect(unlessObject(new NoConstructor(), Example2)).to.throwException(/Expected object to be (Example2 instance|a specific type)/);
		expect(unlessObject(new Example1(), Example2, "name")).to.throwException(/Expected object \[name\] to be (Example2 instance|a specific type)/);

		if (Object.create) {    // don't run this test on IE 8
			expect(unlessObject(Object.create(null), Example2)).to.throwException(/Expected object to be (Example2 instance|a specific type), but it has no prototype/);
		}
	});

	it("checks if condition is true", function() {
		var unlessTrue = wrap(failFast.unlessTrue);

		expect(unlessTrue(true)).to.not.throwException();
		expect(unlessTrue(false)).to.throwException(/Expected condition to be true/);
		expect(unlessTrue(false, "a message")).to.throwException(/a message/);
		expect(unlessTrue("foo")).to.throwException(/Expected condition to be true or false/);
		expect(unlessTrue("foo", "ignored")).to.throwException(/Expected condition to be true or false/);
	});

	it("fails when unreachable code is executed", function() {
		var unreachable = wrap(failFast.unreachable);

		expect(unreachable()).to.throwException(/Unreachable code executed/);
		expect(unreachable("foo")).to.throwException(/foo/);
	});

	function wrap(fn) {
		return function() {
			var outerArgs = arguments;
			return function() {
				fn.apply(this, outerArgs);
			};
		};
	}

});
