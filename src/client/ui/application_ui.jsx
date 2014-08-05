/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

"use strict";

var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");

var ApplicationUi = React.createClass({
  render: function() {
    return <div>
      <h1>Financial Projector</h1>
      <h2>A React Example from <em>Let’s Code: Test-Driven JavaScript</em></h2>

      <ConfigurationPanel />
      <hr />
      <StockMarketTable />

      <div className="footer">
	      <p>This application demonstrates the React library. The financial calculations are made up. Do not use it for real finances.</p>
      </div>
    </div>;
  }
});

module.exports = ApplicationUi;