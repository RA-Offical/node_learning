const UserModel = require("../model/User");
const bcrypt = require("bcrypt");

async function handleNewUser(req, res) {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: "Username and password is required" });
	}
	// check for duplicate users in MongoDB
	const duplicate = await UserModel.findOne({ username }).exec();

	if (duplicate) {
		return res.status(409).json({ message: "Username already exists" }); //Conflict
	}

	try {
		// encrypt the password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// create and store new user
		const newUser = await UserModel.create({
			username,
			password: encryptedPassword,
		});

		console.log(newUser);

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
	}
}

module.exports = { handleNewUser };
