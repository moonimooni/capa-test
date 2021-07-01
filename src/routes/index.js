const storeRouter = require("./store");

const router = require("express").Router();

router.use("/stores", storeRouter);

module.exports = router;
