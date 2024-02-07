const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};

const bcrypt = require("bcrypt");

async function handleLogin(req, res) {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Username and password is required" });
	}

	const user = usersDB.users.find((user) => user.username === username);

	if (!user) {
		// unauthorized
		return res.status(401).json({ message: "User not found" });
	}

	// evaluate password
	const match = await bcrypt.compare(password, user.password);

	if (match) {
		return res.json({ success: "Logged in successfully!" });
	}

	res.status(401).json({ message: "Incorrect password" });
}

module.exports = { handleLogin };
