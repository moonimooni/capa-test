const postcodeIoCall = require("./prefix/postcode_io");
const storeService = require("./store");
const storesData = require("../stores.json");

/**
 *
 * @param {string} storeName
 */
exports.getCoordinateByStoreName = async (storeName) => {
  const postcode = storeService.getStore(storeName).postcode;
  const postcodeInformation = await postcodeIoCall.getPostcodeInformation(
    postcode
  );
  const { longitude, latitude } = postcodeInformation;
  return { longitude, latitude };
};
