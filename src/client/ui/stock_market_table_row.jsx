/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

"use strict";

var StockMarketTableRow = React.createClass({
  render: function() {
    return <tr>
      <td>{this.props.year}</td>
      <td>$10,000</td>
      <td>$7,000</td>
      <td className="negative">($695)</td>
      <td className="negative">($232)</td>
      <td>$9,905</td>
      <td>$108,981</td>
    </tr>;
  }
});

module.exports = StockMarketTableRow;