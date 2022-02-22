const httpStatus = require('http-status');

const apiResponse = (res, message, data, status = httpStatus.OK) => {
  const response = {
    success: true,
    message,
    data,
  };
  res.status(status).send(response);
};

module.exports = apiResponse;
