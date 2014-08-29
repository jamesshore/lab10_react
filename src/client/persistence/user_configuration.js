// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("../values/dollars.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var UserConfiguration = module.exports = function UserConfiguration() {
	this._changeHandlers = [];
	this._startingBalance = UserConfiguration.DEFAULT_STARTING_BALANCE;
	this._startingCostBasis = UserConfiguration.DEFAULT_STARTING_COST_BASIS;
	this._yearlySpending = UserConfiguration.DEFAULT_YEARLY_SPENDING;

//	setInterval(function() {
//		this.setYearlySpending(new UserEnteredDollars(this._yearlySpending.plus(new ValidDollars(1)).toString()));
//	}.bind(this), 500)
};

UserConfiguration.DEFAULT_STARTING_BALANCE = new UserEnteredDollars("10000");
UserConfiguration.DEFAULT_STARTING_COST_BASIS = new UserEnteredDollars("7000");
UserConfiguration.DEFAULT_YEARLY_SPENDING = new UserEnteredDollars("695");

UserConfiguration.STARTING_YEAR = new Year(2010);
UserConfiguration.INTEREST_RATE = new GrowthRate(10);
UserConfiguration.CAPITAL_GAINS_TAX_RATE = new TaxRate(25);
UserConfiguration.ENDING_YEAR = new Year(2050);

UserConfiguration.prototype.getStartingBalance = function getStartingBalance() {
	return this._startingBalance;
};

UserConfiguration.prototype.setStartingBalance = function setStartingBalance(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	this._startingBalance = dollars;
	triggerChangeEvent(this);
};

UserConfiguration.prototype.getStartingCostBasis = function getStartingCostBasis() {
	return this._startingCostBasis;
};

UserConfiguration.prototype.setStartingCostBasis = function setStartingCostBasis(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	this._startingCostBasis = dollars;
	triggerChangeEvent(this);
};

UserConfiguration.prototype.getYearlySpending = function getYearlySpending() {
	return this._yearlySpending;
};

UserConfiguration.prototype.setYearlySpending = function setYearlySpending(dollars) {
	failFast.unlessObject(dollars, Dollars, "dollars");

	this._yearlySpending = dollars;
	triggerChangeEvent(this);
};

UserConfiguration.prototype.onChange = function onChange(callback) {
	this._changeHandlers.push(callback);
};

function triggerChangeEvent(self) {
	self._changeHandlers.forEach(function(handler) {
		handler(self);
	});
}