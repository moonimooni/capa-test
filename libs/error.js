/**
 *
 * @param {string} message
 * @param {number} status
 */
exports.createError = (message, status) => {
  const newError = new Error(message);
  newError.status = status;
  return newError;
};
