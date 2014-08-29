/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var UserEnteredDollars = require("../values/user_entered_dollars.js");

var ConfigurationField = module.exports = React.createClass({
	simulateChange: function simulateChange(value) {
		this.handleChange({ target: { value: value }});
	},

	handleChange: function handleChange(event) {
		this.props.onChange(event.target.value);
	},

  render: function render() {
	  var target = new RenderTarget();
	  this.props.value.renderTo(target);
	  return target.createComponent(this, this.props.value.getUserText());
  }
});

function RenderTarget() {}

RenderTarget.prototype.render = function render(values) {
	this._rendering = values;
};

RenderTarget.prototype.createComponent = function createComponent(self, userText) {
	var invalidClass = this._rendering.invalid ? "invalid" : null;

	return <div>
		<label>{self.props.name}: </label>
		<input type="text" className={invalidClass} title={this._rendering.tooltip} value={userText} onChange={self.handleChange} />
	</div>;
};
