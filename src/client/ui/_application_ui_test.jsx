/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var ApplicationUi = require("./application_ui.js");
var ConfigurationPanel = require("./configuration_panel.js");
var StockMarketTable = require("./stock_market_table.js");
var UserConfiguration = require("../persistence/user_configuration.js");
var StockMarketYear = require("../domain/stock_market_year.js");
var StockMarketProjection = require("../domain/stock_market_projection.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("ApplicationUi", function() {

	var app;
	var config;

	beforeEach(function() {
		config = new UserConfiguration();
		config.setStartingBalance(new UserEnteredDollars("13821"));
		app = TestUtils.renderIntoDocument(<ApplicationUi initialConfiguration={config} />);
	});

	it("renders configuration panel with user configuration", function() {
		checkComponent(panel(), <ConfigurationPanel userConfiguration={config} />);
	});

	it("renders stock market table with projection based on user configuration", function() {
		checkComponent(table(), <StockMarketTable stockMarketProjection={projectionFor(config)} />);
	});

	it("uses default config if none provided", function() {
		app = TestUtils.renderIntoDocument(<ApplicationUi />);
		checkComponent(panel(), <ConfigurationPanel userConfiguration={new UserConfiguration()} />);
	});

	it("update stock market table when user configuration changes", function() {
		config.setStartingBalance(new UserEnteredDollars("new value"));
		checkComponent(table(), <StockMarketTable stockMarketProjection={projectionFor(config)} />);
	});

	function checkComponent(actual, expected) {
		var actualRendering = React.renderComponentToStaticMarkup(actual._descriptor);
		var expectedRendering = React.renderComponentToStaticMarkup(expected);

		expect(actualRendering).to.equal(expectedRendering);
	}

	function projectionFor(config) {
		var firstYear = new StockMarketYear(
			UserConfiguration.STARTING_YEAR,
			config.getStartingBalance(),
			config.getStartingCostBasis(),
			UserConfiguration.INTEREST_RATE,
			UserConfiguration.CAPITAL_GAINS_TAX_RATE
		);
		var projection = new StockMarketProjection(
			firstYear,
			UserConfiguration.ENDING_YEAR,
			config.getYearlySpending()
		);
		return projection;
	}

	function panel() {
		return TestUtils.findRenderedComponentWithType(app, ConfigurationPanel);
	}

	function table() {
		return TestUtils.findRenderedComponentWithType(app, StockMarketTable);
	}

});
