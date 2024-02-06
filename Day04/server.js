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
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
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
