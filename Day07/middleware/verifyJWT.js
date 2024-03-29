const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader.startsWith("Bearer ")) {
		res.sendStatus(401); // not authorize
	}

	const token = authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403); //invalied token

		req.username = decoded.username;
		req.roles = decoded.UserInfo.roles;
		next();
	});
}

module.exports = verifyJWT;
