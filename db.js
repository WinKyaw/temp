var mongoose = require("mongoose");

const mongoURL = "mongodb://localhost/store";

exports.connect = () => {
	mongoose.connect(mongoURL, {

	}).then(() => {
		console.log("Store DB is up and running!");
	}).catch((err) => {
		console.error("DB connection error");
		console.error(err);
	});
} ;