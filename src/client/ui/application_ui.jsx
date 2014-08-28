/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var StockMarketProjection = require("../domain/stock_market_projection.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var STARTING_YEAR = new Year(2010);
var STARTING_BALANCE = new ValidDollars(10000);
var STARTING_COST_BASIS = new ValidDollars(3000);
var INTEREST_RATE = new GrowthRate(10);
var CAPITAL_GAINS_TAX_RATE = new TaxRate(25);

var ENDING_YEAR = new Year(2050);
var YEARLY_SPENDING = new ValidDollars(36);


var ApplicationUi = module.exports = React.createClass({
  render: function() {
	  var firstYear = new StockMarketYear(STARTING_YEAR, STARTING_BALANCE, STARTING_COST_BASIS, INTEREST_RATE, CAPITAL_GAINS_TAX_RATE);
		var projection = new StockMarketProjection(firstYear, ENDING_YEAR, YEARLY_SPENDING);

    return <div>
      <h1>Financial Projector</h1>
      <h2>A React Example from <em>Let’s Code: Test-Driven JavaScript</em></h2>

      <ConfigurationPanel />
      <hr />
	    <StockMarketTable stockMarketProjection={projection} />

      <div className="footer">
	      <p>This application demonstrates the React library. The financial calculations are made up. Do not use it for real finances.</p>
      </div>
    </div>;
  }
});
