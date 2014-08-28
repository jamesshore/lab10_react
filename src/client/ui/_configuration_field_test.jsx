/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var ConfigurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationField", function() {

	it("displays label", function() {
		var field = <ConfigurationField name="Example" initialValue={new UserEnteredDollars("123")} />;
		var label = TestUtils.findRenderedDOMComponentWithTag(TestUtils.renderIntoDocument(field), "label");

		expect(textOf(label.getDOMNode())).to.equal("Example: ");
	});

	it("displays initial value", function() {
		var field = <ConfigurationField name="Example" initialValue={new UserEnteredDollars("123")} />;
		var input = TestUtils.findRenderedDOMComponentWithTag(TestUtils.renderIntoDocument(field), "input");

		expect(input.getDOMNode().value).to.equal("123");
		expect(input.getDOMNode().className).to.equal("");
	});

	it("sets 'invalid' class when user enters invalid value", function() {
		var field = <ConfigurationField name="Example" initialValue={new UserEnteredDollars("xxx")} />;
		var input = TestUtils.findRenderedDOMComponentWithTag(TestUtils.renderIntoDocument(field), "input");

		var inputNode = input.getDOMNode();
		expect(inputNode.className).to.equal("invalid");
		expect(inputNode.title).to.equal("Invalid dollar amount");
	});

	it("value changes when user changes the input field", function() {
		var field = <ConfigurationField name="Example" initialValue={new UserEnteredDollars("123")} />;
		var input = TestUtils.findRenderedDOMComponentWithTag(TestUtils.renderIntoDocument(field), "input");

		TestUtils.Simulate.change(input, { target: { value: "foo" } });
		expect(input.getDOMNode().value).to.equal("foo");
	});

	it("calls event handler when user changes input field", function() {
		var eventTriggered = null;

		var field = <ConfigurationField
			name="example"
			initialValue={new UserEnteredDollars("123")}
			onChange={handler}
		/>;
		var input = TestUtils.findRenderedDOMComponentWithTag(TestUtils.renderIntoDocument(field), "input");

		TestUtils.Simulate.change(input, { target: { value: "foo" } });
		expect(eventTriggered).to.be("foo");

		function handler(value) {
			eventTriggered = value;
		}
	});

	function textOf(domNode) {
		if (domNode.textContent) return domNode.textContent;
		else return domNode.innerText;
	}
});
