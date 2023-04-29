const express = require("express");
const chatsController = require("../controller/chatsController");

const router = express.Router();

router.get("/", chatsController.getItems);
router.post("/", chatsController.postItems);

module.exports = router;