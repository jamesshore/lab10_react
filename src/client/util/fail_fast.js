// Copyright (c) 2013 Titanium I.T. LLC. All rights reserved. See LICENSE.TXT for details.
"use strict";

exports.unlessDefined = function(variable, variableName) {
	if (variable === undefined) throw new FailFastException(exports.unlessDefined, "Required variable" + normalize(variableName) + "was not defined");
};

exports.unlessNumber = checkTypeFn("number");
exports.unlessString = checkTypeFn("string");
exports.unlessArray = checkTypeFn("array");
exports.unlessObject = checkTypeFn("object");

exports.unlessTrue = function(variable, message) {
	if (message === undefined) message = "Expected condition to be true";

	if (variable === false) throw new FailFastException(exports.unlessTrue, message);
	if (variable !== true) throw new FailFastException(exports.unlessTrue, "Expected condition to be true or false");
};

exports.unreachable = function(message) {
	if (!message) message = "Unreachable code executed";

	throw new FailFastException(exports.unreachable, message);
};

function checkTypeFn(expectedType) {
	return function(variable, variableName) {
		var actualType = getType(variable);
		if (actualType !== expectedType) throw new FailFastException(exports.unlessNumber, "Expected variable" + normalize(variableName) + "to be " + expectedType + ", but was " + actualType);
	};
}

function getType(variable) {
	var type = typeof variable;
	if (variable === null) type = "null";
	if (Array.isArray(variable)) type = "array";
	if (type === "number" && isNaN(variable)) type = "NaN";
	return type;
}

function normalize(variableName) {
	return variableName ? " [" + variableName + "] " : " ";
}


var FailFastException = exports.FailFastException = function(fnToRemoveFromStackTrace, message) {
	if (Error.captureStackTrace) Error.captureStackTrace(this, fnToRemoveFromStackTrace);
	this.message = message;
};
FailFastException.prototype = Object.create(Error.prototype);
FailFastException.prototype.constructor = FailFastException;
FailFastException.prototype.name = "FailFastException";
