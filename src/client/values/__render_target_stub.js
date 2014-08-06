// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var __RenderTargetStub = module.exports = function() {
	this.reset();
};

__RenderTargetStub.prototype.setText = function setText(text) {
	this.text = text;
};

__RenderTargetStub.prototype.setNegative = function setNegative() {
	this.negative = true;
};

__RenderTargetStub.prototype.setInvalid = function setInvalid(tooltip) {
	this.invalid = true;
	this.tooltip = tooltip;
};

__RenderTargetStub.prototype.reset = function reset() {
	this.text = undefined;
	this.negative = false;
	this.invalid = false;
	this.tooltip = undefined;
};