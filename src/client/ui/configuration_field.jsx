/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var ConfigurationField = module.exports = React.createClass({
  render: function render() {
    return <div>
      <label>{this.props.name}: </label><input type="text" />
    </div>;
  }
});
