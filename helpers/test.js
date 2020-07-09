const util = require("util");
const exec = util.promisify(require("child_process").exec);
const testModel = require("../models/speedTest");
const db = require("./db");
const co = require("co");

module.exports.executeSpeedTest = async function executeSpeedTest() {
    console.log(" -- Starting Operation -- ");

    const { stdout, stderr } = await exec('speedtest --simple');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
    
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

    result = await db.saveDocument(result, "tests");
        
    console.log(" -- Operation completed! -- ");
}