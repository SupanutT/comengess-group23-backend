const express = require("express");
const usersController = require("../controller/usersController");

const router = express.Router();

router.get("/", usersController.getItems);
router.post("/", usersController.postItems);
router.put("/:userid", usersController.updateItemid);

module.exports = router;