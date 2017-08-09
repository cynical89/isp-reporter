"use strict";

const config = require("../config.json");
const db = require("../helpers/db");

let user = null;

module.exports.index = function* index() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	yield this.render("index", {
		title: config.site.name,
		user: user
	});
};

module.exports.reportView = function* reportView() {
	if (this.isAuthenticated()) {
		user = this.session.passport.user;
	}
	yield this.render("reports", {
		title: config.site.name,
		charts: true,
		script: "chart",
		user: user
	});
};

module.exports.allTests = function* allTests() {
	const data = yield db.runView("tests/all", null, "tests");
	return this.body = data.results
};
