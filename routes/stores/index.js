const router = require("express").Router();

const storeController = require("./controller");

router.get("/", storeController.getStores);
router.get("/:storeName", storeController.getStore);

module.exports = router;
