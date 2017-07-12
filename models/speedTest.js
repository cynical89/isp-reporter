"use strict";

const moment = require("moment-timezone");
const config = require("../config.json");

module.exports = {
    newTestScore: (data) => {
        const score = {
            error: false,
            ping: data.ping,
            download: data.download,
            upload: data.upload,
            time: moment().tz(config.site.timezone).format('MMMM Do YYYY, h:mm:ss a')
        }
        return score;
    }
}