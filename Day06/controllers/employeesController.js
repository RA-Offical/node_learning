const { v4: uuid } = require("uuid");
const data = {
	employees: require("../model/employees.json"),
	setEmployees: function (data) {
		this.employees = data;
	},
};

function getAllEmployees(req, res) {
	res.json(data.employees);
}

function createNewEmployee(req, res) {
	const { firstname, lastname } = req.body;

	if (!firstname || !lastname) {
		return res.status(400).json({ message: "First and Last names are required" });
	}

	const id = uuid();
	const newEmployee = { id, firstname, lastname };
	data.setEmployees([...data.employees, newEmployee]);

	res.status(201).json(newEmployee);
}

function updateEmployee(req, res) {
	const { id, firstname, lastname } = req.body;

	console.log(firstname, lastname);

	const employee = data.employees.find((item) => item.id === id);

	if (!employee) {
		return res.status(400).json({ message: `Employee Id ${id} not found` });
	}

	const updatedEmployee = { ...employee };

	if (firstname) {
		updatedEmployee.firstname = firstname;
	}
	if (lastname) {
		updatedEmployee.lastname = lastname;
	}

	const updatedEmployees = data.employees.map((item) => {
		if (item.id === id) {
			return updatedEmployee;
		}
		return item;
	});

	data.setEmployees(updatedEmployees);
	res.json(updatedEmployee);
}

function deleteEmployee(req, res) {
	const id = req.body.id;

	const index = data.employees.findIndex((item) => item.id === id);

	if (index < 0) {
		return res.status(400).json({
			message: `Employee Id ${id} not found`,
		});
	}

	const updatedEmployees = data.employees.filter((item) => item.id !== id);

	data.setEmployees(updatedEmployees);
	res.json({
		id,
	});
}

function getEmployee(req, res) {
	const id = req.params.id;

	const employee = data.employees.find((item) => item.id === id);

	if (!employee) {
		return res.status(400).json({
			message: `Employee Id ${id} not found`,
		});
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
