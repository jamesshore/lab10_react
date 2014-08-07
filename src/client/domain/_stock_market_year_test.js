// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketYear = require("./stock_market_year.js");
var Year = require("../values/year.js");
var GrowthRate = require("../values/growth_rate.js");
var ValidDollars = require("../values/valid_dollars.js");
var TaxRate = require("../values/tax_rate.js");

var YEAR = new Year(2010);
var STARTING_BALANCE = new ValidDollars(10000);
var STARTING_COST_BASIS = new ValidDollars(3000);
var INTEREST_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

describe("StockMarketYear", function() {

	var year;

	beforeEach(function() {
		year = new StockMarketYear(YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);
	});

	it("provides initial values", function() {
		expect(year.year()).to.eql(YEAR);
		expect(year.startingBalance()).to.eql(STARTING_BALANCE);
		expect(year.startingCostBasis()).to.eql(STARTING_COST_BASIS);
		expect(year.growthRate()).to.eql(INTEREST_RATE);
		expect(year.capitalGainsTaxRate()).to.eql(CAPITAL_GAINS_TAX_RATE);
	});

	it("accumulates total sold", function() {
		expect(year.totalSellOrders() + "").to.eql("$0");

		year.sell(new ValidDollars(3000));
		expect(year.totalSellOrders() + "").to.eql("$3,000");

		year.sell(new ValidDollars(750));
		year.sell(new ValidDollars(1350));
		expect(year.totalSellOrders() + "").to.eql("$5,100");
	});

	it("calculates capital gains tax, including tax on withdrawals made to cover capital gains", function() {
		year.sell(new ValidDollars(4000));
		expect(year.capitalGainsTaxIncurred() + "").to.equal("$1,333");
		expect(year.totalSold() + "").to.equal("$5,333");
	});

	it("treats all sales as subject to capital gains tax until all capital gains have been sold", function () {
		year.sell(new ValidDollars(500));
		expect(year.capitalGainsTaxIncurred() + "").to.equal("$167");

		var capitalGains = STARTING_BALANCE.minus(STARTING_COST_BASIS);
		year.sell(capitalGains);
		expect(year.capitalGainsTaxIncurred() + "").to.equal("$2,333");

		year.sell(new ValidDollars(1000));
		expect(year.capitalGainsTaxIncurred() + "").to.equal("$2,333");
	});

	it("calculates growth (sales, including capital gains tax, don't grow)", function() {
		expect(year.growth() + "").to.equal("$1,000");

		year.sell(new ValidDollars(2000));
		expect(year.growth() + "").to.equal("$733");
	});

	it("calculates ending cost basis (sales less than capital gains do not reduce cost basis)", function() {
		year.sell(new ValidDollars(500));
		expect(year.endingCostBasis()).to.eql(STARTING_COST_BASIS);

		year.sell(new ValidDollars(6500));
		// total sold (including tax): 9333
		// capital gains: 7000
		// cost basis reduced by: 9333 - 7000 = 2333
		// starting cost basis: 3000
		// expected cost basis: 3000 - 2333 = 667
		expect(year.endingCostBasis() + "").to.equal("$667");

		year.sell(new ValidDollars(1000));
		expect(year.endingCostBasis() + "").to.equal("($333)");
	});

	it("calculates balance at end of year, including sales, tax, and growth", function() {
		expect(year.endingBalance() + "").to.equal("$11,000");

		year.sell(new ValidDollars(1000));
		expect(year.endingBalance() + "").to.equal("$9,533");
	});

	it("next year's starting values equal this year's ending values", function() {
		var nextYear = year.nextYear();

		expect(nextYear.year()).to.eql(new Year(2011));
		expect(nextYear.startingBalance()).to.eql(year.endingBalance());
		expect(nextYear.startingCostBasis()).to.eql(year.endingCostBasis());
		expect(nextYear.growthRate()).to.eql(year.growthRate());
		expect(nextYear.capitalGainsTaxRate()).to.eql(year.capitalGainsTaxRate());
	});

});