const { getPostCodeInformation } = require("./prefix/postcode_io");
const storeService = require("./store");
const storesList = require("../stores.json");

/**
 *
 * @param {string} postCode
 */
exports.getCoordinateByStoreName = async (storeName) => {
  const postCode = storeService.getStore(storeName, storesList).postcode;
  const postCodeInformation = await getPostCodeInformation(postCode);
  const { longitude, latitude } = postCodeInformation;
  return { longitude, latitude };
};
