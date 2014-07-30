/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

(function() {
  "use strict";

  var ConfigurationPanel = require("./configuration_panel.js");

  var StockMarketRow = React.createClass({
    render: function() {
      return <tr>
        <td>{this.props.year}</td>
        <td>$10,000</td>
        <td>$7,000</td>
        <td>($695)</td>
        <td>($232)</td>
        <td>$9,905</td>
        <td>$108,981</td>
      </tr>;
    }
  });

  var StockMarketTable = React.createClass({
    render: function() {
      return <table>
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
          <StockMarketRow year="2010" />
          <StockMarketRow year="2011" />
          <StockMarketRow year="2012" />
          <StockMarketRow year="2013" />
        </tbody>
      </table>;
    }
  });

  var Application = React.createClass({
    render: function() {
      return <div>
        <ConfigurationPanel />
        <hr />
        <StockMarketTable />
      </div>;
    }
  });

  exports.Application = Application;
}());