/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketRow = require("./stock_market_table_row.js");
var Year = require("../values/year.js");

var StockMarketTable = React.createClass({
  render: function() {
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
        <StockMarketRow year={new Year(2010)} />
        <StockMarketRow year={new Year(2011)} />
        <StockMarketRow year={new Year(2012)} />
        <StockMarketRow year={new Year(2013)} />
      </tbody>
    </table>;
  }
});

module.exports = StockMarketTable;