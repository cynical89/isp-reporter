"use strict";

const config = require("./config.json");

const koa = require("koa");
const hbs = require("koa-hbs");
const serve = require("koa-static-folder");

// for passport support
const session = require("koa-generic-session");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const redis = require("koa-redis");

// speed testing
const schedule = require("node-schedule");
const test = require("./helpers/test");

const app = koa();

exports.app = app;
exports.passport = passport;

// the auth model for passport support
require("./models/auth");

// misc handlebars helpers
require("./helpers/handlebars");

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];
if (process.env.NODE_ENV === "production") {
	app.use(session({
		cookie: {maxAge: 1000 * 60 * 60 * 24},
		store : redis()
	}));
} else {
	app.use(session());
}

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// statically serve assets
app.use(serve("./assets"));

// load up the handlebars middlewear
app.use(hbs.middleware({

	viewPath: `${__dirname}/views`,
	layoutsPath: `${__dirname}/views/layouts`,
	partialsPath: `${__dirname}/views/partials`,
	defaultLayout: "main"
}));

app.use(function* error(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit("error", err, this);
	}
});

require("./routes");

console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

if (process.env.SERVER_MODE === "production") {
	test.executeSpeedTest();

	// Run the test every hour, on the hour
	schedule.scheduleJob("0 * * * *", () => {
		test.executeSpeedTest();
	});
}

process.on("SIGINT", function exit() {
	process.exit();
});
