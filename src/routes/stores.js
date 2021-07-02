const router = require("express").Router();

const storeController = require("../controllers/stores");

router.get("/:storeName/coordinate", storeController.getStoreCoordinate);
router.get("/:storeName", storeController.getStore);
router.get("/", storeController.getStores)

module.exports = router;
