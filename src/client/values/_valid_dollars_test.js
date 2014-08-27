// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ValidDollars = require("./valid_dollars.js");
var InvalidDollars = require("./invalid_dollars.js");
var UserEnteredDollars = require("./user_entered_dollars.js");
var FailFastException = require("../util/fail_fast.js").FailFastException;
var __RenderTargetStub = require("./__render_target_stub.js");

var MAX_VALID = new ValidDollars(ValidDollars.MAX_VALUE);
var MIN_VALID = new ValidDollars(ValidDollars.MIN_VALUE);

describe("ValidDollars", function() {

	var _0 = new ValidDollars(0);
	var _10 = new ValidDollars(10);
	var _20 = new ValidDollars(20);
	var _30 = new ValidDollars(30);
	var _50 = new ValidDollars(50);
	var _100 = new ValidDollars(100);
	var _minus20 = new ValidDollars(-20);
	var invalid = new InvalidDollars();
	var user20 = new UserEnteredDollars("20");

	describe("logic", function() {
		it("prevents dollars from being constructed outside of valid range", function() {
			expect(new ValidDollars(ValidDollars.MAX_VALUE + 1)).to.eql(new InvalidDollars());
			expect(new ValidDollars(ValidDollars.MIN_VALUE - 1)).to.eql(new InvalidDollars());
		});

		it("is always valid", function() {
			expect(_10.isValid()).to.be(true);
		});

		it("converts to underlying data type (for 'Dollars family' use only)", function() {
			expect(new ValidDollars(12.34567891)._toNumber()).to.equal(12.34567891);
		});

		it("adds", function() {
			expect(_10.plus(_20)).to.eql(_30);
			expect(_10.plus(invalid)).to.eql(invalid);
			expect(_10.plus(user20)).to.eql(_30);
		});

		it("subtracts", function() {
			expect(_50.minus(_30)).to.eql(_20);
			expect(_30.minus(_50)).to.eql(_minus20);
			expect(_50.minus(invalid)).to.eql(invalid);
			expect(_50.minus(user20)).to.eql(_30);
		});

		it("subtracts with a floor of zero (this comes up more often than you might think)", function() {
			expect(_50.subtractToZero(_30)).to.eql(_20);
			expect(_30.subtractToZero(_50)).to.eql(_0);
			expect(_30.subtractToZero(invalid)).to.eql(invalid);
			expect(_30.subtractToZero(user20)).to.eql(_10);
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
			expect(_30.min(invalid)).to.eql(invalid);
			expect(_30.min(user20)).to.eql(_20);
		});
	});


	describe("string conversion", function() {
		it("ignores pennies", function() {
			expect(new ValidDollars(10.10) + "").to.equal("$10");
			expect(new ValidDollars(9.90) + "").to.equal("$10");
			expect(new ValidDollars(10.5) + "").to.equal("$11");
			expect(new ValidDollars(-0.5) + "").to.equal("($1)");
		});

		it("formats long numbers with commas", function() {
			expect(new ValidDollars(1234) + "").to.equal("$1,234");
			expect(new ValidDollars(12345678) + "").to.equal("$12,345,678");
			expect(new ValidDollars(123456789) + "").to.equal("$123,456,789");
		});

		it("formats negative numbers with parentheses", function() {
			expect(_minus20 + "").to.equal("($20)");
			expect(_0 + "").to.equal("$0");
		});
	});


	describe("rendering", function() {
		var target;

		beforeEach(function() {
			target = new __RenderTargetStub();
		});

		it("converts to string", function() {
			_20.renderTo(target);
			expect(target.rendering.text).to.equal(_20.toString());
		});

		it("handles sign", function() {
			_20.renderTo(target);
			expect(target.rendering.negative).to.be(false);

			_minus20.renderTo(target);
			expect(target.rendering.negative).to.be(true);
		});

		it("treats zero, and negative values that round up to zero, as positive", function() {
			_0.renderTo(target);
			expect(target.rendering.negative).to.be(false);

			new ValidDollars(-0.49).renderTo(target);
			expect(target.rendering.negative).to.be(false);

			new ValidDollars(-0.5).renderTo(target);
			expect(target.rendering.negative).to.be(true);
		});

		it("is never invalid", function() {
			_20.renderTo(target);
			expect(target.rendering.invalid).to.be(false);
			expect(target.rendering.tooltip).to.be(undefined);
		});
	});

});