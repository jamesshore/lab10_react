// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var Year = require("./year.js");
var __RenderTargetStub = require("./__render_target_stub.js");

describe("Year", function() {

	var _2010 = new Year(2010);
	var _2011 = new Year(2011);
	var _2050 = new Year(2050);

	it("increments year", function() {
		expect(_2010.nextYear()).to.eql(_2011);
	});

	it("counts years in range", function() {
		expect(_2010.numberOfYearsInclusive(_2050)).to.equal(41);
	});

	it("converts to string", function() {
		expect(_2010.toString()).to.equal("2010");
	});

	it("renders itself", function() {
		var target = new __RenderTargetStub();
		_2010.renderTo(target);

		expect(target.rendering).to.eql({
			text: "2010",
			negative: false,
			invalid: false
		});
	});

});