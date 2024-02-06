const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const router = express.Router();

const data = {};
data.employees = require("../../data/employees.json");

router
	.route("/")
	.get((req, res) => {
		res.json(data.employees);
	})
	.post((req, res) => {
		const id = uuid();
		const firstname = req.body.firstname;
		const lastname = req.body.lastname;
		const newRecord = { id, firstname, lastname };
		data.employees.push(newRecord);

		res.json({
			id,
			firstname,
			lastname,
		});
	})
	.put((req, res) => {
		console.log(req.body);
		const { id, firstname, lastname } = req.body;

		const record = data.employees.find((item) => item.id === id);

		if (firstname) {
			record.firstname = firstname;
		}
		if (lastname) {
			record.lastname = lastname;
		}

		res.json(record);
	})
	.delete((req, res) => {
		const id = req.body.id;
		data.employees = data.employees.filter((item) => item.id !== id);
		res.json({
			id,
		});
	});

router.route("/:id").get((req, res) => {
	const id = req.params.id;
	const record = data.employees.find((item) => item.id === id);

	res.json({
		...record,
	});
});

module.exports = router;
