/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketTableCell = require("./stock_market_table_cell.js");

var StockMarketTableRow = module.exports = React.createClass({
  render: function render() {
		var year = this.props.stockMarketYear;

	  return <tr>
	    <StockMarketTableCell value={year.year()} />
	    <StockMarketTableCell value={year.startingBalance()} />
	    <StockMarketTableCell value={year.startingCostBasis()} />
	    <StockMarketTableCell value={year.totalSellOrders().flipSign()} />
	    <StockMarketTableCell value={year.capitalGainsTaxIncurred().flipSign()} />
	    <StockMarketTableCell value={year.growth()} />
	    <StockMarketTableCell value={year.endingBalance()} />
    </tr>;
  }
});
