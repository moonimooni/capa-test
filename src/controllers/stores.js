const storeService = require("../services/stores/stores");
const locationService = require("../services/stores/locations");

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
    const store = storeService.getStoreByName(storeName);
    return res.status(200).json({ data: store });
  } catch (err) {
    return next(err);
  }
};

exports.getStoreCoordinate = async (req, res, next) => {
  const { storeName } = req.params;
  try {
    const { longitude, latitude } = await locationService.getCoordinateByStoreName(
      storeName
    );
    const data = { longitude: longitude, latitude: latitude };
    return res.status(200).json({ data: data });
  } catch (err) {
    return next(err);
  }
}