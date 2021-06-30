const router = require("express").Router();

const storeController = require("./controller");

router.get("/", storeController.getStores);

module.exports = router;
