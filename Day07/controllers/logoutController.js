const UserModel = require("../model/User");
async function handleLogout(req, res) {
	const cookies = req.cookies;

	if (!cookies?.jwt) {
		return res.sendStatus(204); //Success request but No content to send back
	}

	const refreshToken = cookies.jwt;

	// is refreshToken in db
	const foundUser = await UserModel.findOne({ refreshToken }).exec();

	if (!foundUser) {
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: false,
			sameSite: "None",
			domain: "localhost",
		});
		return res.sendStatus(204);
	}

	// delete refresh token in MongoDB
	foundUser.refreshToken = "";

	const updatedResult = await foundUser.save();
	console.log(updatedResult);

	res.clearCookie("jwt", { httpOnly: true, secure: false, sameSite: "None", domain: "localhost" });
	res.sendStatus(204);
}

module.exports = { handleLogout };
