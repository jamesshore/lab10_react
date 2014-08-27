// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");

var Year = module.exports = function Year(year) {
	failFast.unlessNumber(year);

	this._year = year;
};

Year.prototype.nextYear = function nextYear() {
	return new Year(this._year + 1);
};

Year.prototype.numberOfYearsInclusive = function numberOfYearsInclusive(endingYear) {
	failFast.unlessObject(endingYear, Year);

	return endingYear._year - this._year + 1;
};

Year.prototype.toString = function toString() {
	return this._year + "";
};

Year.prototype.renderTo = function renderTo(target) {
	target.render({
		text: this.toString(),
		negative: false,
		invalid: false
	});
};