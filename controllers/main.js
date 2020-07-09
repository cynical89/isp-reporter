"use strict";
const moment = require("moment-timezone");
const config = require("../config.json");
const db = require("../helpers/db");

let user = null;

module.exports.index = async(ctx) => {
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	}
	await ctx.render("index", {
		title: config.site.name,
		user: user
	});
};

module.exports.reportView = async(ctx) => {
	if (ctx.isAuthenticated()) {
		user = ctx.session.passport.user;
	}
	await ctx.render("reports", {
		title: config.site.name,
		charts: true,
		script: "chart",
		user: user
	});
};

module.exports.allTests = async(ctx) => {
    const data = await db.runView("tests/all", null, "tests");
    let results = [];
    for(let result of data.results) {
        let newResult = result;
        newResult.time = moment(result.time).tz(config.site.timezone).format('MMMM Do YYYY, HH:mm:ss')
        console.log(newResult.time);
		results.push(newResult);
    }
    console.log(results)
	return ctx.body = results
};
