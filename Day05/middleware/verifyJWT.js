const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyJWT(req, res, next) {
	const authHeader = req.headers["authorization"];

	if (!authHeader) res.sendStatus(401); // not authorize

	console.log(authHeader);

	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); //invalied token

		req.username = decoded.username;
		next();
	});
}

module.exports = verifyJWT;
