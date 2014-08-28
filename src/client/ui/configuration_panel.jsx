/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

var ConfigurationPanel = module.exports = React.createClass({
  render: function render() {
    return <div className="config">
      <ConfigurationField name="Starting Balance" initialValue={new UserEnteredDollars("123")} />
      <ConfigurationField name="Cost Basis" initialValue={new UserEnteredDollars("456")} />
      <ConfigurationField name="Yearly Spending" initialValue={new UserEnteredDollars("789")} />
    </div>;
  }
});
