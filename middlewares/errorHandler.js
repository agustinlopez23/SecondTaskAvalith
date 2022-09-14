const notFound = (_req, _res, next) => {
  const error = new Error();
  error.status = 404;
  return next(`Site not Found! ${error.status}`);
};
const errorHandler = {
  notFound,
};
module.exports = errorHandler;
