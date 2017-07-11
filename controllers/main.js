"use strict";

const config = require("../config.json");

let user = null;

module.exports.index = function* index() {
	this.status = 200;
	return this.body = "Bot is running OK~!";
};
