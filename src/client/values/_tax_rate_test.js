// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TaxRate = require("./tax_rate.js");
var ValidDollars = require("./valid_dollars.js");

describe("TaxRate", function() {

	var rate = new TaxRate(25);

	it("determines the base tax", function() {
		expect(rate.simpleTaxFor(new ValidDollars(1000))).to.eql(new ValidDollars(250));
	});

	it("determines the total cost incurred if you pay tax on the tax (by selling to cover)", function() {
		expect(rate.compoundTaxFor(new ValidDollars(1000)) + "").to.equal("$333");
	});

	it("converts to string", function() {
		expect(rate.toString()).to.equal("25%");
	});

});