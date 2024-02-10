const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileSystemPromises = require("fs").promises;
const path = require("path");

async function handleLogin(req, res) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Username and password is required" });
	}

	const foundUser = await UserModel.findOne({ username });

	if (!foundUser) {
		// unauthorized
		return res.status(401).json({ message: "User not found" });
	}

	// evaluate password
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const userRoles = Object.values(foundUser.roles);

		// create JWTs
		const accessToken = jwt.sign(
			{
				UserInfo: {
					username: foundUser.username,
					roles: userRoles,
				},
			},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "30s",
			}
		);
		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);
		// Saving refreshToken with current user
		foundUser.refreshToken = refreshToken;
		const updatedResult = await foundUser.save();
		console.log(updatedResult);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			secure: false, // Set to true for HTTPS in production
			sameSite: "None", // Consider your usage and adjust if needed
			domain: "localhost", // Adjust for your actual domain in production
			path: "/", // Implicitly set unless you need a specific path
			maxAge: 24 * 60 * 60 * 1000, // 24 hours
		});
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
}

module.exports = { handleLogin };
