const storeService = require("../services/store");

exports.getStores = async (req, res, next) => {
  const params = req.query;
  try {
    const stores = await storeService.getStores(params);
    return res.status(200).json({ data: stores });
  } catch (err) {
    return next(err);
  }
};

exports.getStore = (req, res, next) => {
  const { storeName } = req.params;
  try {
    const store = storeService.getStore(storeName);
    return res.status(200).json({ data: store });
  } catch (err) {
    return next(err);
  }
};
