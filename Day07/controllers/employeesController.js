const Employee = require("../model/Employee");

async function getAllEmployees(req, res) {
	// get all employees from mongoDB
	const employees = await Employee.find();
	if (!employees) {
		return res.status(204).json({ message: "No employee found" });
	}

	res.json(employees);
}

async function createNewEmployee(req, res) {
	const { firstname, lastname } = req.body;

	console.log(firstname, lastname);

	if (!firstname || !lastname) {
		return res.status(400).json({ message: "First and Last names are required" });
	}

	try {
		//  store data in mongoDB
		const newUser = await Employee.create({
			firstname,
			lastname,
		});

		res.status(201).json(newUser);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

async function updateEmployee(req, res) {
	const { id, firstname, lastname } = req.body;

	if (!id) {
		return res.status(400).json({ message: "Id parameter is required." });
	}

	console.log(firstname, lastname);

	const employee = await Employee.findOne({ _id: id }).exec();

	if (!employee) {
		return res.status(204).json({ message: `No Employee matches ${id} ` });
	}

	if (firstname) {
		employee.firstname = firstname;
	}
	if (lastname) {
		employee.lastname = lastname;
	}

	const updatedEmployee = await employee.save();

	res.json(updatedEmployee);
}

async function deleteEmployee(req, res) {
	const id = req.body.id;

	if (!id) {
		return res.status(400).json({ message: "Employee Id is required" });
	}

	const employee = await Employee.findOne({ _id: id }).exec();

	if (!employee) {
		return res.status(204).json({ message: `No Employee matches ${id} ` });
	}

	const result = await Employee.deleteOne({ _id: id });

	res.json(result);
}

async function getEmployee(req, res) {
	const id = req.params.id;

	if (!id) {
		return res.status(400).json({ message: "Employee Id not found" });
	}

	const employee = await Employee.findOne({ _id: id }).exec();

	if (!employee) {
		return res.status(204).json({ message: `No Employee matches ${id} ` });
	}

	res.json(employee);
}

module.exports = {
	getAllEmployees,
	getEmployee,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
};
