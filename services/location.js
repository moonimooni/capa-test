const postcodeIoCall = require("./prefix/postcode_io");
const storeService = require("./store");
const storesList = require("../stores.json");

/**
 *
 * @param {string} storeName
 */
exports.getCoordinateByStoreName = async (storeName) => {
  const postcode = storeService.getStore(storeName, storesList).postcode;
  const postcodeInformation = await postcodeIoCall.getPostcodeInformation(
    postcode
  );
  const { longitude, latitude } = postcodeInformation;
  return { longitude, latitude };
};
