// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var FailFastException = require("../util/fail_fast.js").FailFastException;
var UserConfiguration = require("./user_configuration.js");
var UserEnteredDollars = require("../values/user_entered_dollars.js");

describe("UserConfiguration", function() {

	var config;
	var newValue = new UserEnteredDollars("new value");

	beforeEach(function() {
		config = new UserConfiguration();
	});

	it("has defaults", function() {
		expect(config.getStartingBalance()).to.equal(UserConfiguration.DEFAULT_STARTING_BALANCE);
		expect(config.getStartingCostBasis()).to.equal(UserConfiguration.DEFAULT_STARTING_COST_BASIS);
		expect(config.getYearlySpending()).to.equal(UserConfiguration.DEFAULT_YEARLY_SPENDING);
	});

	describe("change event", function() {

		var eventTriggered = false;

		beforeEach(function() {
			config.onChange(function() {
				eventTriggered = true;
			});
		});

		it("triggers when starting balance changes", function() {
			config.setStartingBalance(newValue);
			expect(eventTriggered).to.be(true);
			expect(config.getStartingBalance()).to.equal(newValue);
		});

		it("triggers when starting cost basis changes", function() {
			config.setStartingCostBasis(newValue);
			expect(eventTriggered).to.be(true);
			expect(config.getStartingCostBasis()).to.equal(newValue);
		});

		it("triggers when yearly spending changes", function() {
			config.setYearlySpending(newValue);
			expect(eventTriggered).to.be(true);
			expect(config.getYearlySpending()).to.equal(newValue);
		});

		it("supports multiple observers", function() {
			var secondHandlerTriggered = false;
			config.onChange(function() {
				secondHandlerTriggered = true;
			});

			config.setStartingBalance(newValue);
			expect(secondHandlerTriggered).to.be(true);
		});
	});

});