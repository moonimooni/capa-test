/**
 *
 * @param {object} params
 */
exports.parseIntParamsValue = (params) => {
  for (let param in params) {
    if (typeof params[param] === "number") {
      params[param] = Number(params[param]);
    }
  }
  return params;
};
