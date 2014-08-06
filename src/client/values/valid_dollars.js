// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var InvalidDollars = require("./invalid_dollars.js");

var ValidDollars = module.exports = function ValidDollars(amount) {
	failFast.unlessDefined(amount, "amount");
	if (!inRange(amount)) return new InvalidDollars();

	this._amount = amount;
};

ValidDollars.MAX_VALUE = 1000000000;
ValidDollars.MIN_VALUE = -1000000000;


ValidDollars.prototype.isValid = function isValid() {
	return true;
};

ValidDollars.prototype._toCoreDataType = function _toCoreDataType() {
	return this._amount;
};

ValidDollars.prototype.plus = function plus(operand) {
	failFast.unlessDefined(operand, "operand");
	if (!operand.isValid()) return new InvalidDollars();

	return new ValidDollars(this._amount + operand._toCoreDataType());
};

ValidDollars.prototype.minus = function minus(operand) {
	failFast.unlessDefined(operand, "operand");
	if (!operand.isValid()) return new InvalidDollars();

	return new ValidDollars(this._amount - operand._toCoreDataType());
};

ValidDollars.prototype.subtractToZero = function subtractToZero(operand) {
	failFast.unlessDefined(operand, "operand");
	if (!operand.isValid()) return new InvalidDollars();
	
	var result = this._amount - operand._toCoreDataType();
	return new ValidDollars(Math.max(0, result));
};

function inRange(value) {
	failFast.unlessDefined(value, "value");
	return (value >= ValidDollars.MIN_VALUE) && (value <= ValidDollars.MAX_VALUE);
}
