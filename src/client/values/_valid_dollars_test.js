// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ValidDollars = require("./valid_dollars.js");
var InvalidDollars = require("./invalid_dollars.js");
var FailFastException = require("../util/fail_fast.js").FailFastException;

describe("ValidDollars", function() {

	var MAX_VALID = new ValidDollars(ValidDollars.MAX_VALUE);
	var MIN_VALID = new ValidDollars(ValidDollars.MIN_VALUE);

	var _0 = new ValidDollars(0);
	var _10 = new ValidDollars(10);
	var _20 = new ValidDollars(20);
	var _30 = new ValidDollars(30);
	var _50 = new ValidDollars(50);
	var _100 = new ValidDollars(100);
	var _minus20 = new ValidDollars(-20);
	var invalid = new InvalidDollars();

	it("prevents dollars from being constructed outside of valid range", function() {
		expect(new ValidDollars(ValidDollars.MAX_VALUE + 1)).to.eql(new InvalidDollars());
		expect(new ValidDollars(ValidDollars.MIN_VALUE - 1)).to.eql(new InvalidDollars());
	});

	it("is always valid", function() {
		expect(_10.isValid()).to.be(true);
	});

	it("converts to underlying data type (for 'Dollars family' use only)", function() {
		expect(new ValidDollars(12.34567891)._toCoreDataType()).to.equal(12.34567891);
	});

	it("adds", function() {
		expect(_10.plus(_20)).to.eql(_30);
		expect(_10.plus(invalid)).to.eql(invalid);
	});

	it("subtracts", function() {
		expect(_50.minus(_30)).to.eql(_20);
		expect(_30.minus(_50)).to.eql(_minus20);
		expect(_50.minus(invalid)).to.eql(invalid);
	});

	it("subtracts with a floor of zero (this comes up more often than you might think)", function() {
		expect(_50.subtractToZero(_30)).to.eql(_20);
		expect(_30.subtractToZero(_50)).to.eql(_0);
		expect(_30.subtractToZero(invalid)).to.eql(invalid);
	});

	it("flips the sign", function() {
		expect(_0.flipSign()).to.eql(_0);
		expect(_20.flipSign()).to.eql(_minus20);
		expect(_minus20.flipSign()).to.eql(_20);
	});

	it("calculates percentage amount", function() {
		expect(_100.percentage(20)).to.eql(_20);
	});

	it("determines lesser of two values", function() {
		expect(_20.min(_30)).to.eql(_20);
		expect(_30.min(_20)).to.eql(_20);
	});

	

});