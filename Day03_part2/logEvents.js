const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fileSystem = require("fs");
const fileSystemPromises = require("fs").promises;
const path = require("path");

async function logEvents(message) {
	const logTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
	const logItem = `${logTime}\t${uuid()}\t${message}\n`;
	console.log(logItem);

	try {
		if (!fileSystem.existsSync(path.join(__dirname, "logs"))) {
			await fileSystemPromises.mkdir(path.join(__dirname, "logs"));
		}

		await fileSystemPromises.appendFile(path.join(__dirname, "logs", "logEvent.txt"), logItem);
	} catch (error) {
		console.log(error);
	}
	g;
}

function logger(req, res, next) {
	console.log(`Request method: ${req.method} --- Request path: ${req.path}`);
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
	next();
}

module.exports = { logEvents, logger };
