const fetch = require("node-fetch");
const createError = require("../../libs/error");
const POSTCODES_IO_URI = "https://api.postcodes.io/postcodes";

/**
 *
 * @param {string} postCode
 */
exports.getPostCodeInformation = (postCode) => {
  const uri = POSTCODES_IO_URI + "/" + postCode;
  return fetch(uri)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((err) => {
      throw createError(
        err.message || "external api call error",
        err.status || 400
      );
    });
};

/**
 *
 * @param {number} centerLongitude
 * @param {number} centerLatitude
 * @param {number} radius
 */
exports.getNearestPostcodesInformation = (
  centerLongitude,
  centerLatitude,
  radius
) => {
  const uri = `${POSTCODES_IO_URI}?lon=${centerLongitude}&lat=${centerLatitude}&radius=${radius}`;
  return fetch(uri)
    .then((res) => res.json())
    .then((json) => json.result)
    .catch((err) => {
      throw createError(
        err.message || "external api call error",
        err.status || 400
      );
    });
};
