const cradle = require("cradle");
const config = require("../config.json");

// A custom Error just for database problems.
function CouchDBError(message) {
	this.name = "CouchDBError";
	this.message = (message || "");
}
CouchDBError.prototype = Error.prototype;

// Connects to a database and returns the DB object.
const connectToDatabase = (dbName) => {
	try {
		// return new(cradle.Connection().database(dbName));
		return new(cradle.Connection)(config.site.db.host, config.site.db.port, { auth: {
			username: config.site.db.username,
			password: config.site.db.password
		}}).database(dbName);
	} catch (err) {
		throw new CouchDBError(`DB: Get: Connection to database [${dbName}] failed`);
	}
};

// Grabs a document from the database in CouchDB.
exports.getDocument = async function getDocument(id, database) {
	try {
		const db = connectToDatabase(database);
		const doc = await db.getAsync(id);
		doc.error = false;
		return doc;
	} catch (err) {
		return {
			error: true,
			message: `DB: Get of [${id}] failed`
		};
	}
};

// Saves a document in the database in CouchDB.
exports.saveDocument = async function saveDocument(document, database) {
	try {
		const db = connectToDatabase(database);
		const returnVal = await db.saveAsync(document.id, document);
		document.id = returnVal.id;
		document.error = false;
		return document;
	} catch (err) {
		return {
			error: true,
			message: `DB: Save of [${document.id}] failed`
		};
	}
};

// Removes a document in the database in CouchDB.
exports.removeDocument = async function removeDocument(id, database) {
	try {
		const db = connectToDatabase(database);
		const returnVal = await db.removeAsync(id);
		returnVal.error = false;
		return returnVal;
	} catch (err) {
		return {
			error: true,
			message: `DB: Delete of [${id}] failed`
		};
	}
};

// Runs a view in the database in CouchDB
exports.runView = async function runView(path, key, database) {
	try {
		const db = connectToDatabase(database);
		const returnVal = {};
		if (key === null) {
			returnVal.results = await db.viewAsync(path);
		} else {
			returnVal.results = await db.viewAsync(path, {key: key});
		}
		returnVal.error = false;
		return returnVal;
	} catch (err) {
		return {
			error: true,
			message: `DB: View of [${path}] failed`
		};
	}
};