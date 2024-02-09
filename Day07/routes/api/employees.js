const express = require("express");
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verfiyRoles");
const router = express.Router();

router
	.route("/")
	.get(employeesController.getAllEmployees)
	.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), employeesController.createNewEmployee)
	.put(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), employeesController.updateEmployee)
	.delete(verifyRoles(ROLES_LIST.ADMIN), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
