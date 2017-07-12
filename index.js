"use strict";

const config = require("./config.json");

const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const schedule = require("node-schedule");
const test = require("./helpers/test");

const app = koa();

exports.app = app;

// trust proxy
app.proxy = true;

// body parser
app.use(bodyParser());

app.use(function* error(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit("error", err, this);
	}
});

console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

schedule.scheduleJob("0 * * * *", () => {
	test.executeSpeedTest();
});

process.on("SIGINT", function exit() {
	process.exit();
});
