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

	it("checks if variable is number", function() {
		var unlessNumber = wrap(failFast.unlessNumber);

		expect(unlessNumber(0)).to.not.throwException();
		expect(unlessNumber("foo")).to.throwException(/Expected variable to be number, but was string/);
		expect(unlessNumber({})).to.throwException(/Expected variable to be number, but was object/);
		expect(unlessNumber([])).to.throwException(/Expected variable to be number, but was array/);
		expect(unlessNumber(undefined)).to.throwException(/Expected variable to be number, but was undefined/);
		expect(unlessNumber(null)).to.throwException(/Expected variable to be number, but was null/);
		expect(unlessNumber(NaN)).to.throwException(/Expected variable to be number, but was NaN/);

		expect(unlessNumber("foo", "name")).to.throwException(/Expected variable \[name\] to be number, but was string/);
	});

	it("checks if variable is other types as well", function() {
		expect(wrap(failFast.unlessString)(null, "name")).to.throwException(/Expected variable \[name\] to be string, but was null/);
		expect(wrap(failFast.unlessArray)(null, "name")).to.throwException(/Expected variable \[name\] to be array, but was null/);
		expect(wrap(failFast.unlessObject)(null, "name")).to.throwException(/Expected variable \[name\] to be object, but was null/);
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
