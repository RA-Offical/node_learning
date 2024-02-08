const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};

const fileSystemPromises = require("fs").promises;
const path = require("path");

async function handleLogout(req, res) {
	const cookies = res.cookies;
	console.log(cookies);

	if (!cookies?.jwt) return res.sendStatus(204); //Success request but No content to send back
	const refreshToken = cookies.jwt;

	// is refreshToken in db
	const foundUser = usersDB.users.find((user) => user.refreshToken === refreshToken);

	if (!foundUser) {
		res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		return res.sendStatus(204);
	}

	// delete refresh token in database
	const otherUsers = usersDB.users.filter((user) => user.refreshToken === foundUser.refreshToken);

	const currentUser = { ...foundUser, refreshToken: "" };

	setUsers([...otherUsers, currentUser]);
	await fileSystemPromises.writeFile(
		path.join(__dirname, "..", "model", "users.json"),
		JSON.stringify(usersDB.users)
	);
	res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
	res.sendStatus(204);
}

module.exports = { handleLogout };
