const midtransClient = require('midtrans-client');
const config = require('./config');

const coreApi = new midtransClient.CoreApi({
  isProduction: config.env === 'production',
  serverKey: config.midtrans.secretKey,
  clientKey: config.midtrans.clientId,
});

module.exports = {
  coreApi,
};