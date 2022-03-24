const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    MIDTRANS_MODE: Joi.string().required(),
    MIDTRANS_SECRET_KEY: Joi.string().required(),
    MIDTRANS_CLIENT_ID: Joi.string().required(),
    MIDTRANS_CALLBACK: Joi.string().required(),
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
  midtrans: {
    mode: envVars.MIDTRANS_MODE,
    secretKey: envVars.MIDTRANS_SECRET_KEY,
    clientId: envVars.MIDTRANS_CLIENT_ID,
    callback: envVars.MIDTRANS_CALLBACK,
  },
};
