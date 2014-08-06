// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var UserEnteredDollars = require("./user_entered_dollars.js");
var ValidDollars = require("./valid_dollars.js");
var InvalidDollars = require("./invalid_dollars.js");

describe("UserEnteredDollars", function() {

	var valid = new UserEnteredDollars("10");
	var invalid = new UserEnteredDollars("xx");
	var _0 = new ValidDollars(0);
	var _20 = new ValidDollars(20);
	var _minus10 = new ValidDollars(-10);

	describe("logic", function() {
		it("can be valid or invalid", function() {
			expect(valid.isValid()).to.be(true);
			expect(invalid.isValid()).to.be(false);
		});

		it("converts to underlying data type (for 'Dollars family' use only)", function() {
			expect(valid._toNumber()).to.equal(10);
		});

		it("adds", function() {
			expect(valid.plus(valid)).to.eql(_20);
		});

		it("subtracts", function() {
			expect(valid.minus(valid)).to.eql(_0);
		});

		it("subtracts with a floor of zero (this comes up more often than you might think)", function() {
			expect(valid.subtractToZero(new UserEnteredDollars("20"))).to.eql(_0);
		});

		it("flips the sign", function() {
			expect(valid.flipSign()).to.eql(_minus10);
		});

		it("calculates percentage amount", function() {
			expect(valid.percentage(200)).to.eql(_20);
		});

		it("determines lesser of two values", function() {
			expect(valid.min(_0)).to.eql(_0);
		});
	});

	describe("string parsing", function() {
		it("parses numbers", function() {
			expect(parse("")).to.equal(0);
			expect(parse("42")).to.equal(42);
			expect(parse("42.13")).to.equal(42.13);
		});

		it("parses dollar signs", function() {
			expect(parse("$42")).to.equal(42);
			expect(parse("$")).to.equal(0);
		});

		it("parses commas", function() {
			expect(parse("1,234")).to.equal(1234);
			expect(parse("1,234,567")).to.equal(1234567);
			expect(parse(",,,4,,,,,,2,,,")).to.equal(42);
		});

		it("parses negative signs", function() {
			expect(parse("-42")).to.equal(-42);
			expect(parse("-$42")).to.equal(-42);
			expect(parse("$-42")).to.equal(-42);
			expect(parse("-")).to.equal(0);
			expect(parse("-$")).to.equal(0);
			expect(parse("$-")).to.equal(0);
		});

		it("parses parentheses", function() {
			expect(parse("(42)")).to.equal(-42);
			expect(parse("($42)")).to.equal(-42);
			expect(parse("$(42)")).to.equal("invalid");

			expect(parse("(-42)")).to.equal("invalid");
			expect(parse("-(42)")).to.equal("invalid");

			expect(parse("$-(42)")).to.equal("invalid");
			expect(parse("$(-42)")).to.equal("invalid");
			expect(parse("-$(42)")).to.equal("invalid");
			expect(parse("-($42)")).to.equal("invalid");
			expect(parse("(-$42)")).to.equal("invalid");
			expect(parse("($-42)")).to.equal("invalid");

			expect(parse("(42")).to.equal(-42);
			expect(parse("42)")).to.equal(-42);

			expect(parse("(")).to.equal(0);
			expect(parse(")")).to.equal(0);
			expect(parse("()")).to.equal(0);
		});

		it("parses illegals", function() {
			expect(parse("x")).to.equal("invalid");
			expect(parse("40e2")).to.equal("invalid");
			expect(parse("40x")).to.equal("invalid");
			expect(parse("NaN")).to.equal("invalid");
		});

		function parse(string) {
			var parsed = new UserEnteredDollars(string);
			return parsed.isValid() ? parsed._toNumber() : "invalid";
		}
	});

});