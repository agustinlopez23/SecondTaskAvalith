const errorLogger = (error, req, res, next) => {
  console.error(error);
  next(error);
};
const errorParser = (error, req, res, next) => {
  if (error.status === 404) {
    res.status(404).send("Not Found");
  } else if (error.status ===400||error.errors.find((error) => error.type === "notNull Violation")) {
    res.status(400).send("Bad Request");
  } else {
    res.status(500).send("Server Error");
  }
};
const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  if (error.status === 404) {
    next(`${error} ${error.status}`);
  } else {
    next(`Server Error${error} ${error.status}`);
  }
};

const errorHandler = {
  notFound,
  errorLogger,
  errorParser,
};
module.exports = errorHandler;
