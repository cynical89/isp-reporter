"use strict";

const config = require("../config.json");

/*
 * this will be used later on to populate out data on charts. These charts will later be uploaded either
 * a static folder to where they can be served, or an image uploading service. These graphs can then be
 * pulled down to demonstrate averages in speed, and fluctuations
 * 
*/ 

module.exports.index = function* index() {
	this.status = 200;
	return this.body = "We are running OK~!";
};
