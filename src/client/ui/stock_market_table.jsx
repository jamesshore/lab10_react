/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketRow = require("./stock_market_table_row.js");
var Year = require("../values/year.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var YEAR = new Year(2010);
var STARTING_BALANCE = new InvalidDollars();
var STARTING_COST_BASIS = new ValidDollars(3000);
var INTEREST_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

var StockMarketTable = React.createClass({
  render: function() {
		var year = new StockMarketYear(YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);

    return <table className="stockmarket">
      <thead>
        <tr>
          <th>Year</th>
          <th>Starting Balance</th>
          <th>Cost Basis</th>
          <th>Sell Orders</th>
          <th>Taxes</th>
          <th>Growth</th>
          <th>Ending Balance</th>
        </tr>
      </thead>
      <tbody>
	      <StockMarketRow stockMarketYear={year} />
      </tbody>
    </table>;
  }
});

module.exports = StockMarketTable;