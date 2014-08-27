/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
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
				'<td class="negative">($695)</td>' +
				'<td class="negative">($232)</td>' +
				"<td>$9,905</td>" +
				"<td>$108,981</td>" +
			"</tr>"
		);
	});

	it("tests exactly the property logic of our component", function() {
		var row = TestUtils.renderIntoDocument(<table><tbody><StockMarketTableRow year="1989" /></tbody></table>);
		var firstTd = TestUtils.scryRenderedDOMComponentsWithTag(row, "td")[0];

		expect(firstTd.getDOMNode().innerHTML).to.equal("1989");
	});
});
