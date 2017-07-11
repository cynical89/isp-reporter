"use strict";

const config = require("./config.json");

const koa = require("koa");
const serve = require("koa-static-folder");
const bodyParser = require("koa-bodyparser");

const app = koa();

exports.app = app;

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.site.secret];

// body parser
app.use(bodyParser());

// statically serve assets
app.use(serve("./assets"));

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

process.on("SIGINT", function exit() {
	process.exit();
});
