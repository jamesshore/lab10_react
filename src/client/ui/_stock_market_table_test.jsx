/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var StockMarketTable = require("./stock_market_table.js");
var StockMarketTableRow = require("./stock_market_table_row.js");
var StockMarketTableCell = require("./stock_market_table_cell.js");

var StockMarketProjection = require("../domain/stock_market_projection.js");
var StockMarketYear = require("../domain/stock_market_year.js");

var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var STARTING_YEAR = new Year(2010);
var STARTING_BALANCE = new ValidDollars(10000);
var STARTING_COST_BASIS = new ValidDollars(3000);
var INTEREST_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

var ENDING_YEAR = new Year(2050);
var YEARLY_SPENDING = new ValidDollars(36);

describe("StockMarketTable", function() {
	var firstYear;
	var projection;
	var table;
	var rows;

	beforeEach(function() {
		firstYear = new StockMarketYear(STARTING_YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);
		projection = new StockMarketProjection(firstYear, ENDING_YEAR, YEARLY_SPENDING);
		table = TestUtils.renderIntoDocument(<StockMarketTable stockMarketProjection={projection} />);
		rows = TestUtils.scryRenderedComponentsWithType(table, StockMarketTableRow);
	});

	it("renders first year", function() {
		var expectedRendering = React.renderComponentToStaticMarkup(<StockMarketTableRow stockMarketYear={firstYear} />);
		var actualRendering = React.renderComponentToStaticMarkup(rows[0]._descriptor);

		expect(expectedRendering).to.equal(actualRendering);
	});

	it("renders all years", function() {
		expect(rows.length).to.equal(41);
	});

	it("renders each year differently", function() {
		var lastYearCell = TestUtils.scryRenderedComponentsWithType(rows[40], StockMarketTableCell)[0];
		expect(lastYearCell.getDOMNode().innerHTML).to.equal("2050");
	});
});
