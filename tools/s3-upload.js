const s3 = require('s3');
const path = require('path');
const build = require('./build');
const task = require('./task');
const config = require('./config');
const AWS_KEYS = require('./aws.keys');


module.exports = task('upload', () => Promise.resolve()
  // .then(() => build())
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
    s3Options: {
      accessKeyId: AWS_KEYS.ACCESS_ID,
      secretAccessKey: AWS_KEYS.SECRET_KEY,
      region: AWS_KEYS.REGION,
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public/',
    deleteRemoved: true,
    s3Params: {
      Bucket: 'berkeley-onederful-demo'
    },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
});

