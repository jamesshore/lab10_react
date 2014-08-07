// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var StockMarketYear = require("./stock_market_year.js");
var Year = require("../values/year.js");
var Dollars = require("../values/dollars.js");

var StockMarketProjection = module.exports = function StockMarketProjection(firstYear, endingYear, amountSoldEachYear) {
	failFast.unlessObject(firstYear, StockMarketYear, "firstYear");
	failFast.unlessObject(endingYear, Year, "endingYear");
	failFast.unlessObject(amountSoldEachYear, Dollars, "amountSoldEachYear");

	this._startingYear = firstYear.year();
	this._endingYear = endingYear;
	this._years = calculateYears(this, firstYear, amountSoldEachYear);
};

StockMarketProjection.prototype.numberOfYears = function numberOfYears() {
	return this._startingYear.numberOfYearsInclusive(this._endingYear);
};

StockMarketProjection.prototype.getYearOffset = function getYearOffset(offset) {
	failFast.unlessNumber(offset);
	failFast.unlessTrue(offset >= 0 && offset < this.numberOfYears(), "Offset needs to be between 0 and " + (this.numberOfYears() - 1) + "; was " + offset);

	return this._years[offset];
};

function calculateYears(self, firstYear, amountSoldEachYear) {
	var result = new Array(self.numberOfYears());

	result[0] = firstYear;
	result[0].sell(amountSoldEachYear);
	for (var i = 1; i < self.numberOfYears(); i++) {
		result[i] = result[i - 1].nextYear();
		result[i].sell(amountSoldEachYear);
	}

	return result;
}