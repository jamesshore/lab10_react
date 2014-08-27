/** @jsx React.DOM */
// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var TestUtils = React.addons.TestUtils;
var StockMarketTableCell = require("./stock_market_table_cell.js");
var Year = require("../values/year.js");
var ValidDollars = require("../values/valid_dollars.js");
var InvalidDollars = require("../values/invalid_dollars.js");

describe("StockMarketTableCell", function() {
	it("renders to HTML", function() {
		var rendered = React.renderComponentToStaticMarkup(<StockMarketTableCell value={new Year(1989)} />);
		expect(rendered).to.equal("<td>1989</td>");
	});

	it("renders text of value", function() {
		expect(textOf(domNodeFor(new Year(1989)))).to.equal("1989");
		expect(textOf(domNodeFor(new ValidDollars(-10)))).to.equal("($10)");
	});

	it("render negative values with CSS class", function() {
		expect(domNodeFor(new ValidDollars(-10)).className).to.equal("negative");
		expect(domNodeFor(new ValidDollars(10)).className).to.equal("");
	});

	it("render invalid values with 'invalid' icon", function() {
		var rendered = React.renderComponentToStaticMarkup(<StockMarketTableCell value={new InvalidDollars()} />);
		expect(rendered).to.equal('<td title="Invalid dollar amount"><img src="/invalid_dollars.png"></td>');
	});

	function domNodeFor(value) {
		var table = TestUtils.renderIntoDocument(
			<table><tbody><tr>
				<StockMarketTableCell value={ value } />
			</tr></tbody></table>
		);
		var cell = TestUtils.findRenderedDOMComponentWithTag(table, "td");
		return cell.getDOMNode();
	}

	function textOf(domNode) {
		if (domNode.textContent) return domNode.textContent;
		else return domNode.innerText;
	}
});
