const storesRouter = require("./stores/index");
const router = require("express").Router();

router.use("/stores", storesRouter);

module.exports = router;
