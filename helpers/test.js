const exec = require("child_process").exec;
const testModel = require("../models/speedTest");
const db = require("./db");
const co = require("co");

module.exports.executeSpeedTest = function executeSpeedTest() {
    console.log(" -- Starting Operation -- ");
    
	exec("speedtest --simple", (err, stdout, stderr) => {
		const arr = stdout.toString().split('\n');
		const arr2 = [];

		for(const a of arr) {
			let s = a.replace(/[^0-9.]/g, "");
			arr2.push(parseFloat(s));
		}

		const p = arr2[0];
		const d = arr2[1];
		const u = arr2[2];

		const obj = {
			ping: p,
			download: d,
			upload: u
		}

		let result = testModel.newTestScore(obj);

		co(function* co() {
			result = yield db.saveDocument(result, "tests");
			
			console.log(" -- Operation completed! -- ");
		});
	});
}