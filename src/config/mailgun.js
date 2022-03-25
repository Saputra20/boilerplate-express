const formData = require('form-data');
const Mailgun = require('mailgun.js');
const config = require('./config');

const mailgun = new Mailgun(formData);

module.exports = mailgun.client({
  username: 'api',
  key: config.mail.mailgunSecret,
});
