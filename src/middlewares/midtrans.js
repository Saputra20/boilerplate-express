/* eslint-disable camelcase */
const httpStatus = require('http-status');
const catchAsync = require('../common/helper/catchAsync');
const security = require('../common/helper/security');
const ApiError = require('../common/helper/ApiError');

const verifyMidtransSignature = catchAsync(async (req, res, next) => {
  const { signature_key, status_code, ...payload } = req.body;
  const { order_id, gross_amount } = payload;
  const validSignature = security.verifyMidtransSignature(
    order_id,
    status_code,
    gross_amount,
    signature_key
  );
  if (!validSignature)
    throw next(new ApiError(httpStatus.UNAUTHORIZED, "Signature couldn't be verified"));
  req.hookPayload = payload;
  next();
});

module.exports = {
  verifyMidtransSignature,
};
