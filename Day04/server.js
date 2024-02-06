const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const { errorHanlder } = require("./middleware/errorHanlder");

// port number
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// making whitelist of applications that can access our beckend
const whitelist = ["https://www.google.com", "http:localhost:5500"];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200,
};

// cross origin resource sharing
app.use(cors(corsOptions));

// built in middlewares

// for hanlding urlencoded data, means form data
app.use(express.urlencoded({ extended: false }));

// for handling json data submission
app.use(express.json());

// for providing access to static files. e.g. .css,.jpg,.png
app.use(express.static(path.join(__dirname, "/public")));

// Route handler
// function one(req, res, next) {
// 	console.log("one");
// 	next();
// }
// function two(req, res, next) {
// 	console.log("two");
// 	next();
// }
// function three(req, res) {
// 	console.log("three");
// 	res.send("Chain finished");
// }

// app.get("/chain(.html)?", [one, two, three]);

// app.get(
// 	"/hello(.html)?",
// 	(req, res, next) => {
// 		console.log("attempted to load hello.html");
// 		next();
// 	},
// 	(req, res) => {
// 		res.send("Hello world");
// 	}
// );

app.get("^/$|/index(.html)?", (req, res) => {
	// send hello world text as response
	// res.send("Hello world");
	// send file as a response
	// res.sendFile("./views/index.html", { root: __dirname });
	// alternative way to send a file
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("./old-page(.html)?", (req, res) => {
	// by default is 302. which means page has temporary moved to a new location
	res.redirect(301, "/new-page.html");
});

// app.get("/*", (req, res) => {
// 	res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "index.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 Not Found" });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

app.use(errorHanlder);

// making server listen
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
