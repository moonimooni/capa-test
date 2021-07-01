const storeService = require("../services/store");
const storesList = require("../stores.json");

exports.getStores = async (req, res, next) => {
  const params = req.query;
  try {
    const stores = await storeService.getStores(params, storesList);
    return res.status(200).json({ data: stores });
  } catch (err) {
    return next(err);
  }
};

exports.getStore = (req, res, next) => {
  const { storeName } = req.params;
  try {
    const store = storeService.getStore(storeName, storesList);
    return res.status(200).json({ data: store });
  } catch (err) {
    return next(err);
  }
};
