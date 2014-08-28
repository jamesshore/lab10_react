/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var ConfigurationPanel = require("./configuration_panel.js");
var ConfigurationField = require("./configuration_field.js");
var UserConfiguration = require("../persistence/user_configuration.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ConfigurationPanel", function() {

	it("initializes configuration fields from user configuration", function() {
		var config = new UserConfiguration();

		var panel = TestUtils.renderIntoDocument(<ConfigurationPanel userConfiguration={config} />);
		var fields = TestUtils.scryRenderedComponentsWithType(panel, ConfigurationField);

		checkComponent(fields[0],
			<ConfigurationField name="Starting Balance" initialValue={UserConfiguration.DEFAULT_STARTING_BALANCE} />);
		checkComponent(fields[1],
			<ConfigurationField name="Cost Basis" initialValue={UserConfiguration.DEFAULT_STARTING_COST_BASIS} />);
		checkComponent(fields[2],
			<ConfigurationField name="Yearly Spending" initialValue={UserConfiguration.DEFAULT_YEARLY_SPENDING} />);
	});

	function checkComponent(actual, expected) {
		var actualRendering = React.renderComponentToStaticMarkup(actual._descriptor);
		var expectedRendering = React.renderComponentToStaticMarkup(expected);

		expect(actualRendering).to.equal(expectedRendering);
	}

});