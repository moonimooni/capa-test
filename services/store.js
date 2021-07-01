const { createError } = require("../libs/error");
const postcodeIoCalls = require("./prefix/postcode_io");

/**
 *
 * @param {number} offset
 * @param {number} limit
 * @param {array} storesList
 */
exports.getStores = (offset, limit, storesList) => {
  if (offset && limit) {
    if (offset >= limit) {
      throw createError("invalid range", 400);
    }
    const spliceCount = limit - offset + 1;
    return storesList.splice(offset, spliceCount);
  } else {
    return storesList;
  }
};

/**
 *
 * @param {string} postcode
 * @param {number} radius
 * @param {storesList} array
 */
exports.getStoresInRadiusByPostcode = async (postcode, radius, storesList) => {
  const { longitude, latitude } = await postcodeIoCalls.getPostCodeInformation(
    postcode
  );
  const addresses = await postcodeIoCalls.getNearestPostcodesInformation(
    longitude,
    latitude,
    radius
  );
  addresses.map((address) => {
    return {
      longitude: address.longitude,
      latitude: address.latitude,
      postcode: address.postcode,
      name: address.parliamentary_constituency,
    };
  });
  addresses.sort((a, b) => {
    return a.latitude - b.latitude;
  });
  return storesList.filter((store) => {
    return addresses.includes((address) => {
      return address.postcode === store.postcode;
    });
  });
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
