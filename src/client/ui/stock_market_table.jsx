/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketRow = require("./stock_market_table_row.js");

var StockMarketTable = module.exports = React.createClass({
  render: function render() {
		var projection = this.props.stockMarketProjection;
	  var year;

	  var rows = [];
	  for (var i = 0; i < (projection.numberOfYears()); i++) {
		  year = projection.getYearOffset(i);
		  rows.push(<StockMarketRow stockMarketYear={year} key={i} />);
    }

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
        {rows}
      </tbody>
    </table>;
  }
});
