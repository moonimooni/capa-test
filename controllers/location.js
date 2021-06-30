const locationService = require("../services/location");

exports.getCoordinate = async (req, res, next) => {
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
};
