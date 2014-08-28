/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = require("./configuration_field.js");

var ConfigurationPanel = module.exports = React.createClass({
  render: function render() {
    return <div className="config">
      <ConfigurationField name="Starting Balance" />
      <ConfigurationField name="Cost Basis" />
      <ConfigurationField name="Yearly Spending" />
    </div>;
  }
});
