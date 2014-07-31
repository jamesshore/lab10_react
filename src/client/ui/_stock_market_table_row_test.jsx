/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.

(function() {
	"use strict";

	var TestUtils = React.addons.TestUtils;
	var StockMarketTableRow = require("./stock_market_table_row.js");

	describe("StockMarket Table Row", function() {
		it("tests static HTML", function() {
			var rendered = React.renderComponentToStaticMarkup(<StockMarketTableRow year="1989" />);
			expect(rendered).to.equal("" +
				"<tr>" +
					"<td>1989</td>" +
					"<td>$10,000</td>" +
					"<td>$7,000</td>" +
					"<td>($695)</td>" +
					"<td>($232)</td>" +
					"<td>$9,905</td>" +
					"<td>$108,981</td>" +
				"</tr>"
			);
		});
	});

}());