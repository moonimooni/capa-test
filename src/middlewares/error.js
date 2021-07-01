exports.errorHandler = (err, req, res, next) => {
  if (err) {
    const message = err.message || "internal server error";
    const status = err.status || 500;
    return res.status(status).json({ message: message });
  }
  return;
};

exports.errorLogger = (err, req, res, next) => {
  if (err) {
    console.log(`[${new Date()}] : ${err.stack}`);
    return next(err);
  }
  return next();
};
