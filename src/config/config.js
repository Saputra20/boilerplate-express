const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    BASE_URL: Joi.string().required(),
    SPACE_NAME: Joi.string().required(),
    SPACE_KEY: Joi.string().required(),
    SPACE_SECRET: Joi.string().required(),
    SPACE_ENDPOINT: Joi.string().required(),
    SPACE_ROOT_DIR: Joi.string().required(),
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
  s3: {
    name: envVars.SPACE_NAME,
    key: envVars.SPACE_KEY,
    secret: envVars.SPACE_SECRET,
    endpoint: envVars.SPACE_ENDPOINT,
    rootDir: envVars.SPACE_ROOT_DIR,
  },
};
