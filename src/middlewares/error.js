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
    console.log(
      `
      [${new Date()}]
      headers : ${JSON.stringify(req.headers)}
      
      url : ${req.url}
      method : ${req.method}

      response status : ${err.statusCode || err.status}
      response message : ${err.error || err.message}
      `
    );
    return next(err);
  }
  return next();
};
