// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var ValidDollars = require("./valid_dollars.js");
var InvalidDollars = require("./invalid_dollars.js");

var UserEnteredDollars = module.exports = function UserEnteredDollars(amount) {
	failFast.unlessString(amount, "amount");

	var number = parseFloat(amount);
	if (isNaN(number)) this._backingDollars = new InvalidDollars();
	else this._backingDollars = new ValidDollars(number);
};

UserEnteredDollars.prototype.isValid = function isValid() {
	return this._backingDollars.isValid();
};

UserEnteredDollars.prototype._toNumber = function _toNumber() {
	return this._backingDollars._toNumber();
};

UserEnteredDollars.prototype.plus = function plus(operand) {
	return this._backingDollars.plus(operand);
};

UserEnteredDollars.prototype.minus = function minus(operand) {
	return this._backingDollars.minus(operand);
};

UserEnteredDollars.prototype.subtractToZero = function subtractToZero(operand) {
	return this._backingDollars.subtractToZero(operand);
};

UserEnteredDollars.prototype.flipSign = function flipSign() {
	return this._backingDollars.flipSign();
};

UserEnteredDollars.prototype.percentage = function percentage(percent) {
	return this._backingDollars.percentage(percent);
};

UserEnteredDollars.prototype.min = function min(operand) {
	return this._backingDollars.min(operand);
};