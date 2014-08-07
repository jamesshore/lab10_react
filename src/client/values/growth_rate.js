// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("./dollars.js");

var GrowthRate = module.exports = function GrowthRate(rateAsPercentage) {
	failFast.unlessNumber(rateAsPercentage, "rateAsPercentage");
	failFast.unlessTrue(rateAsPercentage >= 0, "growth rate must be positive; was " + rateAsPercentage);

	this._rate = rateAsPercentage;
};

GrowthRate.prototype.growthFor = function growthFor(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	return dollars.percentage(this._rate);
};

GrowthRate.prototype.toString = function toString() {
	return this._rate + "%";
};