// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("./dollars.js");
var InvalidDollars = require("./invalid_dollars.js");

var ValidDollars = module.exports = function ValidDollars(amount) {
	failFast.unlessNumber(amount, "amount");
	if (!inRange(amount)) return new InvalidDollars();

	this._amount = amount;
};
Dollars.extend(ValidDollars);

ValidDollars.MAX_VALUE = 1000000000;
ValidDollars.MIN_VALUE = -1000000000;


ValidDollars.prototype.isValid = function isValid() {
	return true;
};

ValidDollars.prototype._toNumber = function _toNumber() {
	return this._amount;
};

ValidDollars.prototype.plus = function plus(operand) {
	return arithmetic(this, operand, function(left, right) {
		return left + right;
	});
};

ValidDollars.prototype.minus = function minus(operand) {
	return arithmetic(this, operand, function(left, right) {
		return left - right;
	});
};

ValidDollars.prototype.subtractToZero = function subtractToZero(operand) {
	return arithmetic(this, operand, function(left, right) {
		return Math.max(0, left - right);
	});
};

ValidDollars.prototype.flipSign = function flipSign(operand) {
	return new ValidDollars(this._amount * -1);
};

ValidDollars.prototype.percentage = function percentage(operand) {
	return new ValidDollars(this._amount * operand / 100);
};

ValidDollars.prototype.min = function min(operand) {
	return arithmetic(this, operand, function(left, right) {
		return Math.min(left, right);
	});
};

ValidDollars.prototype.toString = function toString() {
	var result = absoluteValueString(this._amount);
	if (this._amount < 0) result = "(" + result + ")";
	return result;
};

ValidDollars.prototype.renderTo = function renderTo(target) {
	target.render({
		text: this.toString(),
		negative: (this._amount <= -0.5),
		invalid: false
	});
};

function absoluteValueString(amount) {
	// The following regex courtesy of Elias Zamaria, http://stackoverflow.com/a/2901298
	var unformatted = "" + Math.round(Math.abs(amount));
	var formatted = unformatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return "$" + formatted;
}

function arithmetic(self, operand, fn) {
	failFast.unlessDefined(operand, "operand");
	if (!operand.isValid()) return new InvalidDollars();

	return new ValidDollars(fn(self._amount, operand._toNumber()));
}

function inRange(value) {
	failFast.unlessDefined(value, "value");
	return (value >= ValidDollars.MIN_VALUE) && (value <= ValidDollars.MAX_VALUE);
}
