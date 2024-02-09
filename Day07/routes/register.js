const expresss = require("express");
const registerController = require("../controllers/registerController");
const router = expresss.Router();

router.post("/", registerController.handleNewUser);

module.exports = router;
