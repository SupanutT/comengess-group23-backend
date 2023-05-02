const express = require("express");
const itemsController = require("../controller/itemsController");

const router = express.Router();

router.get("/", itemsController.getItems);
router.post("/", itemsController.postItems);
router.delete("/:item_id", itemsController.deleteItem);
router.put("/:item_id", itemsController.updateItemStatus);

module.exports = router;