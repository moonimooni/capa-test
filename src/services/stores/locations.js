const postcodeIoCall = require("../prefix/postcode_io");
const storeService = require("./stores");

/**
 *
 * @param {string} storeName
 */
exports.getCoordinateByStoreName = async (storeName) => {
  const postcode = storeService.getStoreByName(storeName).postcode;
  const postcodeInformation = await postcodeIoCall.getPostcodeInformation(
    postcode
  );
  const { longitude, latitude } = postcodeInformation;
  return { longitude, latitude };
};
