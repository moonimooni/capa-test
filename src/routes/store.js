const router = require("express").Router();

const storeController = require("../controllers/store");
const locationController = require("../controllers/location");

router.get("/:storeName/coordinate", locationController.getCoordinate);
router.get("/:storeName", storeController.getStore);
router.get("/", storeController.getStores)

module.exports = router;
