/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var UserEnteredDollars = require("../values/user_entered_dollars.js");

var ConfigurationField = module.exports = React.createClass({
	getInitialState: function getInitialState() {
		return {
			value: this.props.initialValue
		};
	},

	handleChange: function handleChange(event) {
		this.setState({
			value: new UserEnteredDollars(event.target.value)
		});
	},

  render: function render() {
	  var target = new RenderTarget();
	  this.state.value.renderTo(target);
	  return target.createComponent(this);
  }
});

function RenderTarget() {}

RenderTarget.prototype.render = function render(values) {
	this._rendering = values;
};

RenderTarget.prototype.createComponent = function createComponent(self, userText) {
	return <div>
		<label>{self.props.name}: </label>
		<input type="text"
			className={this._rendering.invalid? "invalid" : null}
			title={this._rendering.tooltip}
			value={this._rendering.text}
			onChange={self.handleChange}
		/>
	</div>;
};
