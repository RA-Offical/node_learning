const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data) {
		this.users = data;
	},
};

const fileSystemPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

async function handleNewUser(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "Username and password is required" });
	}
	// check for duplicate users
	const duplicate = usersDB.users.find((item) => item.username === username);

	if (duplicate) {
		return res.status(409).json({ message: "Username already exists" }); //Conflict
	}

	try {
		// encrypt the password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// making new user
		const newUser = { username, password: encryptedPassword };
		// creating deep clone of already present users
		const usersCopy = structuredClone(usersDB.users);
		// adding user to array
		usersCopy.push(newUser);
		// setting new users
		usersDB.setUsers(usersCopy);
		// writing to a file
		await fileSystemPromises.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify(usersCopy)
		);

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
	}
}

module.exports = { handleNewUser };
