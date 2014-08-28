// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("./dollars.js");
var ValidDollars = require("./valid_dollars.js");
var InvalidDollars = require("./invalid_dollars.js");

var UserEnteredDollars = module.exports = function UserEnteredDollars(text) {
	failFast.unlessString(text, "text");

	this._userText = text;
	this._backingDollars = parse(text);
};
Dollars.extend(UserEnteredDollars);

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

UserEnteredDollars.prototype.getUserText = function getUserText() {
	return this._userText;
};

UserEnteredDollars.prototype.toString = function toString() {
	return this._backingDollars.toString();
};

UserEnteredDollars.prototype.renderTo = function renderTo(target) {
	this._backingDollars.renderTo(target);
};


function parse(text) {
	var parenthesis = false;
	if (startsWith("(")) {
		text = text.substr(1);
		parenthesis = true;
	}
	if (endsWith(")")) {
		text = text.substr(0, text.length - 1);
		parenthesis = true;
	}
	if (parenthesis) text = "-" + text;

	if (startsWith("$")) text = text.substr(1);
	if (startsWith("-$")) text = "-" + text.substr(2);
	text = text.replace(/,/g, "");

	if (text === "" || text === "-") return new ValidDollars(0);

	if (text.match(/[^\d\.\-]/)) return new InvalidDollars();

	var number = parseFloat(text);
	if (isNaN(number)) return new InvalidDollars();
	else return new ValidDollars(number);


	function startsWith(start) {
		// This code courtesy of CMS, http://stackoverflow.com/a/646643
		return text.slice(0, start.length) === start;
	}

	function endsWith(end) {
		// This code courtesy of CMS, http://stackoverflow.com/a/646643
		return text.slice(-end.length) === end;
	}
}