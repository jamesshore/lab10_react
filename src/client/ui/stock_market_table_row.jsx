/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketTableCell = require("./stock_market_table_cell.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");

var StockMarketTableRow = React.createClass({
  render: function() {
		var year = this.props.stockMarketYear;

	  return <tr>
	    <StockMarketTableCell value={year.year()} />
	    <StockMarketTableCell value={year.startingBalance()} />
	    <StockMarketTableCell value={year.startingCostBasis()} />
	    <StockMarketTableCell value={year.totalSellOrders()} />
	    <StockMarketTableCell value={year.capitalGainsTaxIncurred()} />
	    <StockMarketTableCell value={year.growth()} />
	    <StockMarketTableCell value={year.endingBalance()} />
    </tr>;
  }
});

module.exports = StockMarketTableRow;