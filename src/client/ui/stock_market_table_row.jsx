/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var StockMarketTableCell = require("./stock_market_table_cell.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");

var StockMarketTableRow = React.createClass({
  render: function() {
    return <tr>
	    <StockMarketTableCell value={this.props.year} />
	    <StockMarketTableCell value={new InvalidDollars()} />
	    <StockMarketTableCell value={new ValidDollars(7000)} />
	    <StockMarketTableCell value={new ValidDollars(-695)} />
	    <StockMarketTableCell value={new ValidDollars(-232)} />
	    <StockMarketTableCell value={new ValidDollars(9905)} />
	    <StockMarketTableCell value={new ValidDollars(108981)} />
    </tr>;
  }
});

module.exports = StockMarketTableRow;