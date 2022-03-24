/* eslint-disable camelcase */
const { midtrans } = require('../enum/paymentMethod');
const { coreApi } = require('../config/midtrans');
const ApiError = require('./ApiError');

const charge = async (paymentId, paymentType, paymentInfo, amount, name = '') => {
  const chargeInfo = {
    payment_type: paymentType,
    transaction_detail: {
      order_id: paymentId,
      gross_amount: amount,
    },
    custom_expiry: {
      expiry_duration: 1,
      unit: 'day',
    },
    item_details: [
      {
        id: `${name ? `${name.toLowerCase().replace(' ', '-')}-` : ''}trx#${paymentId}`,
        price: amount,
        quantity: 1,
        name,
      },
    ],
  };

  switch (paymentType) {
    case midtrans.BANK_TRANSFER:
      chargeInfo.bank_transfer = { ...paymentInfo };
      break;
    case midtrans.CREDIT_CARD: {
      const { token_id } = await coreApi.cardToken(paymentInfo);
      chargeInfo.credit_card = {
        token_id,
        authentication: true,
      };
      break;
    }
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Request');
  }
  return coreApi.charge(chargeInfo);
};

module.exports = {
  charge,
};
