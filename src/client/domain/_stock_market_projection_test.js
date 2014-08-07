// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketProjection = require("./stock_market_projection.js");
var StockMarketYear = require("./stock_market_year.js");
var Year = require("../values/year.js");
var GrowthRate = require("../values/growth_rate.js");
var ValidDollars = require("../values/valid_dollars.js");
var TaxRate = require("../values/tax_rate.js");

var STARTING_YEAR = new Year(2010);
var ENDING_YEAR = new Year(2050);
var STARTING_BALANCE = new ValidDollars(10000);
var COST_BASIS = new ValidDollars(7000);
var GROWTH_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

describe("StockMarketProjection", function() {

	var firstYear;

	beforeEach(function() {
		firstYear = new StockMarketYear(STARTING_YEAR, STARTING_BALANCE, COST_BASIS, GROWTH_RATE, CAPITAL_GAINS_TAX_RATE);
	});

	it("contains multiple years", function() {
		var projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(0));

		expect(projection.numberOfYears()).to.equal(41);
		expect(projection.getYearOffset(0).startingBalance()).to.eql(STARTING_BALANCE);
		expect(projection.getYearOffset(1).startingBalance() + "").to.equal("$11,000");
		expect(projection.getYearOffset(40).year()).to.eql(new Year(2050));
	});

	it("sells a standard amount every year", function() {
		var projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(10));

		expect(projection.getYearOffset(0).totalSellOrders() + "").to.equal("$10");
		expect(projection.getYearOffset(1).totalSellOrders() + "").to.equal("$10");
		expect(projection.getYearOffset(40).totalSellOrders() + "").to.equal("$10");
	});

	it("does not have a cumulative rounding error in interest calculations", function() {
		var projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(0));
		expect(projection.getYearOffset(40).endingBalance() + "").to.equal("$497,852");
	});

	it("capital gains tax calculation works the same way as spreadsheet", function() {
		var projection = new StockMarketProjection(firstYear, ENDING_YEAR, new ValidDollars(695));
		expect(projection.getYearOffset(40).endingBalance() + "").to.equal("$2,067");
	});

});