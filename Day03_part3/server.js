// importing common core modules
const http = require("http");
const fileSystem = require("fs");
const fileSystemPromises = require("fs").promises;
const EventEmitter = require("events");
const path = require("path");
// importing custom modules
const logEvents = require("./logEvents");

// creating class for event emitter
class Emitter extends EventEmitter {}

// creating object for emitter
const emitter = new Emitter();

emitter.on("log", (message, fileName) => logEvents(message, fileName));

// port number
const PORT = process.env.PORT || 3500;

async function serveFile(filePath, contentType, response) {
	try {
		const rawData = await fileSystemPromises.readFile(
			filePath,
			contentType.includes("image") ? "" : "utf8"
		);

		const data = contentType === "application/json" ? JSON.parse(rawData) : rawData;

		response.writeHead(filePath.includes("404.html") ? 400 : 200, { "Content-Type": contentType });
		response.end(contentType === "application/json" ? JSON.stringify(data) : data);
	} catch (error) {
		console.log(error);
		emitter.emit("log", `${error.name}: ${error.message}`, "errorLog.txt");
		response.statusCode = 500;
		response.end();
	}
}

// creating server
const server = http.createServer((req, res) => {
	console.log(`Request URL: ${req.url} -------- Request method: ${req.method}`);

	emitter.emit("log", `url: ${req.url} - method: ${req.method}`, "requestLog.txt");

	const fileExtension = path.extname(req.url);

	let contentType;

	switch (fileExtension) {
		case ".css":
			contentType = "text/css";
			break;
		case ".js":
			contentType = "text/javascript";
			break;
		case ".json":
			contentType = "application/json";
			break;
		case ".jpg":
			contentType = "image/jpg";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".txt":
			contentType = "text/plain";
			break;
		default:
			contentType = "text/html";
	}

	console.log(contentType);

	// filepath for requested file
	let filePath =
		contentType === "text/html" && req.url === "/"
			? path.join(__dirname, "views", "index.html")
			: contentType === "text/html" && req.url.slice(-1) === "/"
			? path.join(__dirname, "views", req.url, "index.html")
			: contentType === "text/html"
			? path.join(__dirname, "views", req.url)
			: path.join(__dirname, req.url);

	// making .html extension not required in browser
	if (!fileExtension && req.url.slice(-1) !== "/") {
		filePath = filePath.concat(".html");
	}

	// checking if the fileExist
	const isFileExist = fileSystem.existsSync(filePath);

	if (isFileExist) {
		// server the file
		serveFile(filePath, contentType, res);
	} else {
		switch (path.parse(filePath).base) {
			// 301: redirect
			case "old-page.html":
				res.writeHead(301, { location: "/new-page.html" });
				res.end();
				break;
			case "www-page.html":
				res.writeHead(301, { location: "/" });
				res.end();
				break;
			default:
				// server a 404 response
				serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
		}
	}

	// let filePath;
	// if (req.url === "/" || req.url === "index.html") {
	// 	res.statusCode = 200;
	// 	res.setHeader("Content-Type", "text/html");
	// 	filePath = path.join(__dirname, "views", "index.html");
	// 	fileSystem.readFile(filePath, "utf8", (error, data) => {
	// 		res.end(data);
	// 	});
	// }
});

// making server listen
server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
