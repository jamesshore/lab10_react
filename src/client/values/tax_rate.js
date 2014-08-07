// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("./dollars.js");

var TaxRate = module.exports = function TaxRate(rateAsPercentage) {
	failFast.unlessNumber(rateAsPercentage, "rateAsPercentage");
	failFast.unlessTrue(rateAsPercentage >= 0, "growth rate must be positive; was " + rateAsPercentage);

	this._rate = rateAsPercentage;
};

TaxRate.prototype.simpleTaxFor = function simpleTaxFor(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	return dollars.percentage(this._rate);
};

TaxRate.prototype.compoundTaxFor = function compoundTaxFor(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	var compoundRate = (100 / (100 - this._rate)) - 1;
	return dollars.percentage(compoundRate * 100);
};

TaxRate.prototype.toString = function toString() {
	return this._rate + "%";
};