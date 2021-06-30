const storesService = require("../../services/stores/index");
const storesList = require("../../stores.json");

exports.getStores = (req, res, next) => {
  const { offset, limit } = req.query;
  const offsetNum = Number(offset);
  const limitNum = Number(limit);
  
  try {
    const stores = storesService.getStores(offsetNum, limitNum, storesList);
    return res.status(200).json({ stores: stores });
  } catch (err) {
    return next(err);
  }
};
