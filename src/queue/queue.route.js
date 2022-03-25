const express = require('express');
const { ExpressAdapter } = require('@bull-board/express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const mailQueue = require('./mail/mail.queue');

const router = express.Router();
const adapter = new ExpressAdapter();
const queues = [
  mailQueue,
];

createBullBoard({
  queues: queues.map((q) => new BullAdapter(q)),
  serverAdapter: adapter,
});

adapter.setBasePath('/queue-monitor');
router.use('/', adapter.getRouter());

module.exports = router;
