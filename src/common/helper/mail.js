const config = require('../../config/config');
const mailQueue = require('../../queue/mail/mail.queue');

const _buildOptions = (to, subject, template, data, from = config.mail.supportNoReply) => {
  return {
    from,
    to,
    subject,
    template,
    data,
  };
};

const _dispatch = async (data, options) => {
  return mailQueue.add(data, options);
};

const contactUs = async (data) => {
  return _dispatch(
    _buildOptions(
      config.mail.supportNoReply,
      'Contact',
      'contact',
      data,
      config.mail.supportNoReply
    )
  );
};

module.exports = {
  contactUs,
};
