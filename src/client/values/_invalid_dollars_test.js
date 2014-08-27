// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var InvalidDollars = require("./invalid_dollars.js");
var ValidDollars = require("./valid_dollars.js");
var UserEnteredDollars = require("./user_entered_dollars.js");
var __RenderTargetStub = require("./__render_target_stub.js");

describe("InvalidDollars", function() {

	var invalid = new InvalidDollars();
	var valid = new ValidDollars(20);
	var user = new UserEnteredDollars("20");

	describe("logic", function() {
		it("is never valid", function() {
			expect(invalid.isValid()).to.be(false);
		});

		it("addition is always invalid", function() {
			expect(invalid.plus(valid)).to.eql(invalid);
			expect(invalid.plus(invalid)).to.eql(invalid);
			expect(invalid.plus(user)).to.eql(invalid);
		});

		it("subtraction is always invalid", function() {
			expect(invalid.minus(valid)).to.eql(invalid);
			expect(invalid.minus(invalid)).to.eql(invalid);
			expect(invalid.minus(user)).to.eql(invalid);
		});

		it("subtracting to zero is always invalid", function() {
			expect(invalid.subtractToZero(valid)).to.eql(invalid);
			expect(invalid.subtractToZero(invalid)).to.eql(invalid);
			expect(invalid.subtractToZero(user)).to.eql(invalid);
		});

		it("flipping the sign is always invalid", function() {
			expect(invalid.flipSign()).to.eql(invalid);
		});

		it("percentage is always invalid", function() {
			expect(invalid.percentage(20)).to.eql(invalid);
		});

		it("min is always invalid", function() {
			expect(invalid.min(valid)).to.eql(invalid);
			expect(invalid.min(invalid)).to.eql(invalid);
			expect(invalid.min(user)).to.eql(invalid);
		});
	});


	describe("string conversion", function() {
		it("uses question marks", function() {
			expect(invalid + "").to.equal("$???");
		});
	});


	describe("rendering", function() {
		var target;

		beforeEach(function() {
			target = new __RenderTargetStub();
			invalid.renderTo(target);
		});

		it("is always invalid", function() {
			expect(target.rendering).to.eql({
				text: "$???",
				negative: false,
				invalid: true,
				tooltip: "Invalid dollar amount"
			});
		});
	});


});