const express = require('express');
const auth = require('../middlewares/auth');
const hookController = require('./hook.controller');
const midtransMiddleware = require('../middlewares/midtrans');

const router = express.Router();

router
  .route('/midtrans')
  .post(auth(), midtransMiddleware.verifyMidtransSignature, hookController.midtransHook);

module.exports = router;
