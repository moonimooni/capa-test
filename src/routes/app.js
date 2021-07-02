const storeRouter = require("./stores");

const router = require("express").Router();

router.use("/stores", storeRouter);

module.exports = router;
