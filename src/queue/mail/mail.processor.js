const path = require('path');
const { createQueue } = require('..');

const mailQueue = createQueue('Mail');
const processorPath = path.resolve(__dirname, 'mail.processor.js');
mailQueue.process(processorPath);

module.exports = mailQueue;
