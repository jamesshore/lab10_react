// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("../values/dollars.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

var UserConfiguration = module.exports = function UserConfiguration() {
	this._startingBalance = UserConfiguration.DEFAULT_STARTING_BALANCE;
	this._startingCostBasis = UserConfiguration.DEFAULT_STARTING_COST_BASIS;
	this._yearlySpending = UserConfiguration.DEFAULT_YEARLY_SPENDING;
};

UserConfiguration.DEFAULT_STARTING_BALANCE = new UserEnteredDollars("10000");
UserConfiguration.DEFAULT_STARTING_COST_BASIS = new UserEnteredDollars("7000");
UserConfiguration.DEFAULT_YEARLY_SPENDING = new UserEnteredDollars("695");

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
	failFast.unlessTrue(this._changeHandler === undefined, "Support for multiple observers isn't implemented yet");
	this._changeHandler = callback;
};

function triggerChangeEvent(self) {
	if (self._changeHandler) self._changeHandler(self);
}