/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = React.createClass({
  render: function() {
    return <div>
      <label>{this.props.name}: </label><input type="text" />
    </div>;
  }
});

var ConfigurationPanel = React.createClass({
  render: function() {
    return <div className="config">
      <ConfigurationField name="Starting Balance" />
      <ConfigurationField name="Cost Basis" />
      <ConfigurationField name="Yearly Spending" />
    </div>;
  }
});

module.exports = ConfigurationPanel;