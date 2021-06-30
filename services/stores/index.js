const { createError } = require("../../libs/error");

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
