const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');
const uuid = require('uuid');
const config = require('../../config/config');
const aws = require('../../config/aws');

const key = (req, file, cb) => {
  const filename = uuid.v4();
  const fileExt = file.mimetype.split('/')[1];
  const { folder } = req.body;
  const hasFolder = !!folder;
  const folderStr = `${folder}/`;
  cb(null, `${config.s3.rootDir}/${hasFolder ? folderStr : ''}${filename}.${fileExt}`);
};

const transform = (req, file, cb) => {
  const quality = 85;
  const fileExt = file.mimetype.split('/')[1];
  switch (fileExt) {
    case 'png':
      cb(null, sharp().png({ quality }));
      break;
    case 'jpeg':
      cb(null, sharp().jpeg({ quality }));
      break;
    default:
      break;
  }
};

const s3Storage = {
  limits: { fileSize: 1024 * 1024 * 24 }, // 24 MB
  storage: multerS3({
    s3: aws.spaceClient,
    acl: aws.spaceACL.PUBLIC_READ,
    bucket: config.s3.name || 'bucket-name',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    shouldTransform: (req, file, cb) => {
      cb(null, /^image/i.test(file.mimetype));
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key,
    transforms: [
      {
        id: 'compressed',
        key,
        transform,
      },
    ],
  }),
};

const pickFileFromTransform = (files) => {
  let location;
  if (files.transforms) {
    location = files.transforms.filter((f) => f.id === 'compressed').pop().location;
  } else {
    location = files.location;
  }
  return location;
};

module.exports = {
  s3Storage,
  pickFileFromTransform,
};
