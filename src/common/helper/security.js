const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const config = require('../../config/config');

const SALT_ROUND = 10;

const hash = (plaintext) => {
  return bcrypt.hashSync(plaintext, SALT_ROUND);
};

const compareHash = (plaintext, hashed) => {
  return bcrypt.compareSync(plaintext, hashed);
};

const verifyMidtransSignature = (orderId, statusCode, grossAmount, signature) => {
  const sha512 = crypto.createHash('sha512');
  const payload = `${orderId}${statusCode}${grossAmount}${config.midtrans.secretKey}`;
  const calculatedSignature = sha512.update(payload).digest('hex');
  return signature === calculatedSignature;
};

module.exports = {
  hash,
  compareHash,
  verifyMidtransSignature,
};
