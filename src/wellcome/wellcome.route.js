const express = require('express');
const wellcomeController = require('./wellcome.controller');

const router = express.Router();

router.get('/', wellcomeController.index);

module.exports = router;
