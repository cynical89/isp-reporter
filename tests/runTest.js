/* The only purpose of this file is to be able to run the speed tests
*  separately from the server for development purposes
*/

const test = require("../helpers/test");

(async () => {
	await test.executeSpeedTest();
});