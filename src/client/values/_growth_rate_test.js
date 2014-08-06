// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var GrowthRate = require("./growth_rate.js");
var ValidDollars = require("./valid_dollars.js");

describe("GrowthRate", function() {

	var rate = new GrowthRate(10);

	it("calculates growth", function() {
		expect(rate.growthFor(new ValidDollars(1000))).to.eql(new ValidDollars(100));
	});

	it("converts to string", function() {
		expect(rate.toString()).to.equal("10%");
	});

});