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

describe("ApplicationUi", function() {

	var app;
	var panel;
	var table;

	beforeEach(function() {
		app = TestUtils.renderIntoDocument(<ApplicationUi />);
		panel = TestUtils.findRenderedComponentWithType(app, ConfigurationPanel);
		table = TestUtils.findRenderedComponentWithType(app, StockMarketTable);
	});

	it("initializes configuration panel with default user configuration", function() {
		checkComponent(panel, <ConfigurationPanel userConfiguration={new UserConfiguration()} />);
	});

	it("renders stock market table with projection based on user configuration", function() {
		var firstYear = new StockMarketYear(
			UserConfiguration.STARTING_YEAR,
			UserConfiguration.DEFAULT_STARTING_BALANCE,
			UserConfiguration.DEFAULT_STARTING_COST_BASIS,
			UserConfiguration.INTEREST_RATE,
			UserConfiguration.CAPITAL_GAINS_TAX_RATE
		);
		var projection = new StockMarketProjection(
			firstYear,
			UserConfiguration.ENDING_YEAR,
			UserConfiguration.DEFAULT_YEARLY_SPENDING
		);

		checkComponent(table, <StockMarketTable stockMarketProjection={projection} />);
	});

	function checkComponent(actual, expected) {
		var actualRendering = React.renderComponentToStaticMarkup(actual._descriptor);
		var expectedRendering = React.renderComponentToStaticMarkup(expected);

		expect(actualRendering).to.equal(expectedRendering);
	}

});
