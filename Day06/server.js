const http = require("http");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const { errorHanlder } = require("./middleware/errorHanlder");

// port number
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

// built in middlewares
// for hanlding urlencoded data, means form data
app.use(express.urlencoded({ extended: false }));
// for handling json data submission
app.use(express.json());
// middleware for cookies
app.use(cookieParser());

// for providing access to static files. e.g. .css,.jpg,.png
app.use("/", express.static(path.join(__dirname, "/public")));
// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use(verifyJWT);
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
