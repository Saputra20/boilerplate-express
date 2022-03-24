const AWS = require('aws-sdk');
const config = require('./config');

const spaceACL = {
  PUBLIC_READ: 'public-read',
};

const spaceEndpoint = new AWS.Endpoint(config.s3.endpoint);

const spaceClient = new AWS.S3({
  endpoint: spaceEndpoint,
  accessKeyId: config.s3.key,
  secretAccessKey: config.s3.secret,
});

module.exports = {
  spaceACL,
  spaceClient,
};
