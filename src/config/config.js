const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    MAILGUN_DOMAIN: Joi.string().required(),
    MAILGUN_SECRET: Joi.string().required(),
    MAIL_SUPPORT_NO_REPLY: Joi.string().required(),
    MAIL_FROM_HEADER: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().allow('', null).default(''),
    QUEUE_KEY_PREFIX: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  queueKeyPrefix: envVars.QUEUE_KEY_PREFIX,
  mail: {
    mailgunDomain: envVars.MAILGUN_DOMAIN,
    mailgunSecret: envVars.MAILGUN_SECRET,
    supportNoReply: envVars.MAIL_SUPPORT_NO_REPLY,
    fromHeader: envVars.MAIL_FROM_HEADER,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
};
