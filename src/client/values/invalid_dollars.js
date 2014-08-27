// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var failFast = require("../util/fail_fast.js");
var Dollars = require("./dollars.js");

var InvalidDollars = module.exports = function() {
	this._invalid = "invalid dollars";
};
Dollars.extend(InvalidDollars);

InvalidDollars.prototype.isValid = function isValid() {
	return false;
};

InvalidDollars.prototype.plus =
InvalidDollars.prototype.minus =
InvalidDollars.prototype.subtractToZero =
InvalidDollars.prototype.percentage =
InvalidDollars.prototype.min =
	function binaryArithmetic(operand) {
		failFast.unlessDefined(operand, "operand");
		return new InvalidDollars();
	};

InvalidDollars.prototype.flipSign =
	function unaryArithmetic() {
		return new InvalidDollars();
	};

InvalidDollars.prototype.toString = function toString() {
	return "$???";
};

InvalidDollars.prototype.renderTo = function renderTo(target) {
	target.render({
		text: "$???",
		negative: false,
		invalid: true,
		tooltip: "Invalid dollar amount"
	});
};