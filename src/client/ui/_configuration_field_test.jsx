/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var ConfigurationField = require("./configuration_field.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationField", function() {

	var field;
	var eventTriggered;

	beforeEach(function() {
		field = TestUtils.renderIntoDocument(<ConfigurationField
			name="Example"
			initialValue={new UserEnteredDollars("123")}
			onChange={changeHandler}
		/>);

		function changeHandler(newValue) {
			eventTriggered = newValue;
		}
	});

	it("displays label", function() {
		expect(textOf(label())).to.equal("Example: ");
	});

	it("displays initial value", function() {
		expect(input().value).to.equal("123");
		expect(input().className).to.equal("");
	});

	it("sets 'invalid' class when user enters invalid value", function() {
		var component = <ConfigurationField name="Example" initialValue={new UserEnteredDollars("xxx")} />;
		field = TestUtils.renderIntoDocument(component);

		expect(input().className).to.equal("invalid");
		expect(input().title).to.equal("Invalid dollar amount");
	});

	describe("events", function() {

		it("calls event handler when user changes input field", function() {
			TestUtils.Simulate.change(input(), { target: { value: "foo" } });
			expect(eventTriggered).to.be("foo");
		});

		it("enables tests to simulate changes", function() {
			field.simulateChange("bar");
			expect(eventTriggered).to.be("bar");
		});
	});

	function label() {
		return TestUtils.findRenderedDOMComponentWithTag(field, "label").getDOMNode();
	}

	function input() {
		return TestUtils.findRenderedDOMComponentWithTag(field, "input").getDOMNode();
	}

	function textOf(domNode) {
		if (domNode.textContent) return domNode.textContent;
		else return domNode.innerText;
	}

});
