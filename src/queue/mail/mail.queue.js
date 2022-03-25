const { sendMail } = require('../../mail/mail.service');

module.exports = (job) => sendMail(job.data);
