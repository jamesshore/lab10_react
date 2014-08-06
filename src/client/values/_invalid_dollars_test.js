// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var InvalidDollars = require("./invalid_dollars.js");

describe("InvalidDollars", function() {

	var invalid = new InvalidDollars();

	it("is never valid", function() {
		expect(invalid.isValid()).to.be(false);
	});
});