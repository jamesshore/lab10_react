// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var InvalidDollars = module.exports = function() {
	this._invalid = "invalid dollars";
};

InvalidDollars.prototype.isValid = function isValid() {
	return false;
};