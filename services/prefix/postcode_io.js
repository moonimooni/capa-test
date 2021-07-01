const fetch = require("node-fetch");
const { createError } = require("../../libs/error");
const POSTCODES_IO_URI = "https://api.postcodes.io/postcodes";

/**
 *
 * @param {string} postcode
 */
exports.getPostcodeInformation = (postcode) => {
  const uri = POSTCODES_IO_URI + "/" + postcode;
  return fetch(uri)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res.result;
      } else {
        throw createError(res.error, res.status);
      }
    })
    .catch((err) => {
      throw createError(
        err.message || "postcodes.io call error",
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
exports.getPostcodesInformationInRadius = (
  centerLongitude,
  centerLatitude,
  radius
) => {
  const uri = `${POSTCODES_IO_URI}?lon=${centerLongitude}&lat=${centerLatitude}&radius=${radius}`;
  if (radius <= 0 || radius > 2000) {
    throw createError("invalid radius range", 400);
  }
  return fetch(uri)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        return res.result;
      } else {
        throw createError(res.error, res.status);
      }
    })
    .catch((err) => {
      throw createError(
        err.message || "postcodes.io call error",
        err.status || 400
      );
    });
};
