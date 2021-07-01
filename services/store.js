const { createError } = require("../libs/error");
const { parseIntParamsValue } = require("../libs/params");
const postcodeIoCalls = require("./prefix/postcode_io");

/**
 *
 * @param {object} params
 * @param {array} storesList
 */
exports.getStores = async (params, storesList) => {
  const { offset, limit, radius, postcode } = parseIntParamsValue(params);
  if (radius && postcode) {
    const {
      longitude,
      latitude,
    } = await postcodeIoCalls.getPostCodeInformation(postcode);

    const addresses = await postcodeIoCalls.getNearestPostcodesInformation(
      longitude,
      latitude,
      radius
    );

    addresses.sort((a, b) => {
      return b.latitude - a.latitude;
    });

    storesList = storesList.filter((store) => {
      return addresses.some((address) => {
        return address.postcode === store.postcode;
      });
    });
  }

  if (offset && limit) {
    if (offset >= limit) {
      throw createError("invalid range", 400);
    }
    const spliceCount = limit - offset + 1;
    storesList = storesList.splice(offset, spliceCount);
  }
  return storesList;
};

/**
 *
 * @param {string} storeName
 * @param {array} storesList
 */
exports.getStore = (storeName, storesList) => {
  const store = storesList.find((storeObject) => {
    return storeObject.name === storeName;
  });
  if (!store) {
    throw createError("store not found", 404);
  } else {
    return store;
  }
};
