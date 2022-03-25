/* eslint-disable security/detect-non-literal-fs-filename */
const fs = require('fs');
const ejs = require('ejs');
const juice = require('juice');
const { htmlToText } = require('html-to-text');
const mailgun = require('../config/mailgun');
const config = require('../config/config');

const sendMail = async (mailOptions) => {
  const { data, template, ...options } = mailOptions;
  const templatePath = `src/common/lib/mail/templates/${template}.html`;

  if (fs.existsSync(templatePath)) {
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(templateContent, data);
    const text = htmlToText(html);
    const htmlWithStylesInlined = juice(html);

    options.html = htmlWithStylesInlined;
    options.text = text;
  }
  return mailgun.messages.create(config.mail.mailgunDomain, options);
};

module.exports = {
  sendMail,
};
