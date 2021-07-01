const { createError } = require("../libs/error");
const { parseIntParamsValue } = require("../libs/params");

const postcodeIoCall = require("./prefix/postcode_io");

const storesJson = require("../stores.json");

/**
 *
 * @param {object} params
 */
exports.getStores = async (params) => {
  const { radius, postcode } = parseIntParamsValue(params);
  let storesData = storesJson;

  if (radius && postcode) {
    const { longitude, latitude } = await postcodeIoCall.getPostcodeInformation(
      postcode
    );

    const postcodesInformation = await postcodeIoCall.getPostcodesInformationInRadius(
      longitude,
      latitude,
      radius
    );

    postcodesInformation.sort((a, b) => {
      return b.latitude - a.latitude;
    });

    storesData = storesData.filter((store) => {
      return postcodesInformation.some((address) => {
        return address.postcode === store.postcode;
      });
    });
  }

  return storesData;
};

/**
 *
 * @param {string} storeName
 */
exports.getStore = (storeName) => {
  const store = storesJson.find((storeObject) => {
    return storeObject.name === storeName;
  });
  if (!store) {
    throw createError("store not found", 404);
  } else {
    return store;
  }
};
