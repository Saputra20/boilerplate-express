/* eslint-disable camelcase */
const apiResponse = require('../common/helper/apiResponse');
const catchAsync = require('../common/helper/catchAsync');
const hookService = require('./hook.service');

const midtransHook = catchAsync(async (req, res) => {
  await hookService.midtransHook(req.hookPayload);
  apiResponse(res);
});

module.exports = {
  midtransHook,
};
