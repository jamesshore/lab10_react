/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var StockMarketTableRow = require("./stock_market_table_row.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var YEAR = new Year(2010);
var STARTING_BALANCE = new ValidDollars(10000);
var STARTING_COST_BASIS = new ValidDollars(3000);
var INTEREST_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

describe("StockMarket Table Row", function() {
	var cells;
	var year = new StockMarketYear(YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);

	it("renders columns", function() {
		var table = TestUtils.renderIntoDocument(
			<table><tbody>
				<StockMarketTableRow stockMarketYear={year} />
			</tbody></table>
		);
		cells = TestUtils.scryRenderedDOMComponentsWithTag(table, "td");

		expect(textOf(cells[0])).to.equal(year.year().toString());
		expect(textOf(cells[1])).to.equal(year.startingBalance().toString());
		expect(textOf(cells[2])).to.equal(year.startingCostBasis().toString());
		expect(textOf(cells[3])).to.equal(year.totalSellOrders().toString());
		expect(textOf(cells[4])).to.equal(year.capitalGainsTaxIncurred().toString());
		expect(textOf(cells[5])).to.equal(year.growth().toString());
		expect(textOf(cells[6])).to.equal(year.endingBalance().toString());
	});

	function textOf(reactComponent) {
		var domNode = reactComponent.getDOMNode();
		if (domNode.textContent) return domNode.textContent;
		else return domNode.innerText;
	}

});
