class Hook {
  async midtransHook(payload) {
    const { order_id, transaction_status, fraud_status } = payload;

    if (
      (transaction_status === 'capture' && fraud_status === 'accept') ||
      transaction_status === 'settlement'
    ) {
      // TO DO
    }
  }
}

module.exports = new Hook();
