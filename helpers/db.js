const co = require("co");
const Promise = require("bluebird");
const cradle = Promise.promisifyAll(require("cradle"));
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
exports.getDocument = function* getDocument(id, database) {
	try {
		const db = connectToDatabase(database);
		const doc = yield db.getAsync(id);
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
exports.saveDocument = function* saveDocument(document, database) {
	try {
		const db = connectToDatabase(database);
		const returnVal = yield db.saveAsync(document.id, document);
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
exports.removeDocument = function* removeDocument(id, database) {
	try {
		const db = connectToDatabase(database);
		const returnVal = yield db.removeAsync(id);
		returnVal.error = false;
		return returnVal;
	} catch (err) {
		return {
			error: true,
			message: `DB: Delete of [${id}] failed`
		};
	}
};