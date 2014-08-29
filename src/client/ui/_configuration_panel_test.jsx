/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var ConfigurationPanel = require("./configuration_panel.js");
var ConfigurationField = require("./configuration_field.js");
var UserConfiguration = require("../persistence/user_configuration.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationPanel", function() {

	var config;
	var fields;

	beforeEach(function() {
		config = new UserConfiguration();
		var panel = TestUtils.renderIntoDocument(<ConfigurationPanel userConfiguration={config} />);
		fields = TestUtils.scryRenderedComponentsWithType(panel, ConfigurationField);
	});

	it("initializes configuration fields from user configuration", function() {
		checkComponent(fields[0],
			<ConfigurationField name="Starting Balance" initialValue={UserConfiguration.DEFAULT_STARTING_BALANCE} />);
		checkComponent(fields[1],
			<ConfigurationField name="Cost Basis" initialValue={UserConfiguration.DEFAULT_STARTING_COST_BASIS} />);
		checkComponent(fields[2],
			<ConfigurationField name="Yearly Spending" initialValue={UserConfiguration.DEFAULT_YEARLY_SPENDING} />);
	});

	it("changes to configuration fields are applied to user configuration", function() {
		fields[0].simulateChange("new balance");
		fields[1].simulateChange("new cost basis");
		fields[2].simulateChange("new spending");

		expect(config.getStartingBalance()).to.eql(new UserEnteredDollars("new balance"));
		expect(config.getStartingCostBasis()).to.eql(new UserEnteredDollars("new cost basis"));
		expect(config.getYearlySpending()).to.eql(new UserEnteredDollars("new spending"));
	});

	function checkComponent(actual, expected) {
		var actualRendering = React.renderComponentToStaticMarkup(actual._descriptor);
		var expectedRendering = React.renderComponentToStaticMarkup(expected);

		expect(actualRendering).to.equal(expectedRendering);
	}

});
