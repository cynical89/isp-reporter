"use strict";

const config = require("../config.json");

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
}
