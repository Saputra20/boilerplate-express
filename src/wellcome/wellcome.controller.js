const catchAsync = require('../common/helper/catchAsync');
const apiResponse = require('../common/helper/apiResponse');

const index = catchAsync(async (req, res) => {
  apiResponse(res, 'hello');
});

module.exports = {
  index,
};
