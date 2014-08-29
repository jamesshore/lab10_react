/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var UserConfiguration = require("../persistence/user_configuration.js");
var StockMarketProjection = require("../domain/stock_market_projection.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");
var GrowthRate = require("../values/growth_rate.js");
var TaxRate = require("../values/tax_rate.js");

var ApplicationUi = module.exports = React.createClass({
  render: function() {
	  var config = new UserConfiguration();

	  var firstYear = new StockMarketYear(
		  UserConfiguration.STARTING_YEAR,
		  UserConfiguration.DEFAULT_STARTING_BALANCE,
		  UserConfiguration.DEFAULT_STARTING_COST_BASIS,
		  UserConfiguration.INTEREST_RATE,
		  UserConfiguration.CAPITAL_GAINS_TAX_RATE
	  );
		var projection = new StockMarketProjection(
			firstYear,
			UserConfiguration.ENDING_YEAR,
			UserConfiguration.DEFAULT_YEARLY_SPENDING
		);

    return <div>
      <h1>Financial Projector</h1>
      <h2>A React Example from <em>Let’s Code: Test-Driven JavaScript</em></h2>

      <ConfigurationPanel userConfiguration={config} />
      <hr />
	    <StockMarketTable stockMarketProjection={projection} />

      <div className="footer">
	      <p>This application demonstrates the React library. The financial calculations are made up. Do not use it for real finances.</p>
      </div>
    </div>;
  }
});
