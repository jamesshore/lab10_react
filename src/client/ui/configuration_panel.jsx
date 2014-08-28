/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

var ConfigurationPanel = module.exports = React.createClass({
  render: function render() {
    return <div className="config">
      <ConfigurationField
        name="Starting Balance"
        initialValue={this.props.userConfiguration.getStartingBalance()}
      />
      <ConfigurationField
        name="Cost Basis"
        initialValue={this.props.userConfiguration.getStartingCostBasis()}
      />
      <ConfigurationField
        name="Yearly Spending"
        initialValue={this.props.userConfiguration.getYearlySpending()}
      />
    </div>;
  }
});
