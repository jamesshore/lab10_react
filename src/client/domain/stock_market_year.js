// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Year = require("../values/year.js");
var GrowthRate = require("../values/growth_rate.js");
var Dollars = require("../values/dollars.js");
var ValidDollars = require("../values/valid_dollars.js");
var TaxRate = require("../values/tax_rate.js");

var StockMarketYear = module.exports = function StockMarketYear(year, startingBalance, costBasis, growthRate, capitalGainsTaxRate) {
	failFast.unlessObject(year, Year, "year");
	failFast.unlessObject(startingBalance, Dollars, "startingBalance");
	failFast.unlessObject(costBasis, Dollars, "costBasis");
	failFast.unlessObject(growthRate, GrowthRate, "growthRate");
	failFast.unlessObject(capitalGainsTaxRate, TaxRate, "capitalGainsTaxRate");

	this._year = year;
	this._startingBalance = startingBalance;
	this._startingCostBasis = costBasis;
	this._growthRate = growthRate;
	this._capitalGainsTaxRate = capitalGainsTaxRate;
	this._totalSellOrders = new ValidDollars(0);
};

StockMarketYear.prototype.year = function year() {
	return this._year;
};

StockMarketYear.prototype.startingBalance = function startingBalance() {
	return this._startingBalance;
};

StockMarketYear.prototype.startingCostBasis = function startingCostBasis() {
	return this._startingCostBasis;
};

StockMarketYear.prototype.growthRate = function growthRate() {
	return this._growthRate;
};

StockMarketYear.prototype.capitalGainsTaxRate = function capitalGainsTaxRate() {
	return this._capitalGainsTaxRate;
};

StockMarketYear.prototype.totalSellOrders = function totalSellOrders() {
	return this._totalSellOrders;
};

StockMarketYear.prototype.sell = function sell(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	this._totalSellOrders = this._totalSellOrders.plus(dollars);
};

StockMarketYear.prototype.capitalGainsTaxIncurred = function capitalGainsTaxIncurred() {
	return this._capitalGainsTaxRate.compoundTaxFor(capitalGainsSold(this));
};

StockMarketYear.prototype.totalSold = function totalSold() {
	return this.totalSellOrders().plus(this.capitalGainsTaxIncurred());
};

StockMarketYear.prototype.growth = function growth() {
	return this.growthRate().growthFor(this.startingBalance().minus(this.totalSold()));
};

StockMarketYear.prototype.endingCostBasis = function endingCostBasis() {
	var purchasesSold = this.totalSold().subtractToZero(startingCapitalGains(this));
	return this.startingCostBasis().minus(purchasesSold);
};

StockMarketYear.prototype.endingBalance = function endingBalance() {
	return this.startingBalance().plus(this.growth()).minus(this.totalSold());
};

StockMarketYear.prototype.nextYear = function nextYear() {
	return new StockMarketYear(
		this.year().nextYear(),
		this.endingBalance(),
		this.endingCostBasis(),
		this.growthRate(),
		this.capitalGainsTaxRate()
	);
};

function capitalGainsSold(self) {
	return startingCapitalGains(self).min(self.totalSellOrders());
}

function startingCapitalGains(self) {
	return self.startingBalance().minus(self.startingCostBasis());
}