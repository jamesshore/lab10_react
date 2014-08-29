/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

var ConfigurationPanel = module.exports = React.createClass({
	handleChange: function handleChange(setterFn, newValue) {
		setterFn.call(this.props.userConfiguration, new UserEnteredDollars(newValue));
	},

  render: function render() {
    return <div className="config">
      <ConfigurationField
        name="Starting Balance"
        value={this.props.userConfiguration.getStartingBalance()}
	      onChange={this.handleChange.bind(this, this.props.userConfiguration.setStartingBalance)}
      />
      <ConfigurationField
        name="Cost Basis"
        value={this.props.userConfiguration.getStartingCostBasis()}
	      onChange={this.handleChange.bind(this, this.props.userConfiguration.setStartingCostBasis)}
      />
      <ConfigurationField
        name="Yearly Spending"
        value={this.props.userConfiguration.getYearlySpending()}
	      onChange={this.handleChange.bind(this, this.props.userConfiguration.setYearlySpending)}
      />
    </div>;
  }
});
