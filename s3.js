import AWS from 'aws-sdk';
import config from './application_config';

AWS.config.region = 'us-west-1';
AWS.config.accessKeyId = config.awsKey;
AWS.config.secretAccessKey = config.awsSecret;

/**
 */
export function upload({buff, objectName}) {
  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3({params: {
      Bucket: config.awsBucket,
      Key: objectName,
      ContentType: 'image/jpeg'
    }});

    s3.upload({Body: buff}, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      resolve(objectName);
    });
  });
}

export function getSignedUrl(objectName) {
  return new Promise((resolve, reject) => {
    let s3 = new AWS.S3();

    return s3.getSignedUrl('getObject', {Bucket: config.awsBucket, Key: objectName}, (err, url) => {
      if (err) {
        return reject(err);
      }

      resolve(url);
    });
  });
}

/**
 * @param {String} objectName amazon s3 object name (filename)
 */
export function deleteObject(objectName) {
  return new Promise((resolve, reject) => {
    if (!objectName) {
      throw new Error('no S3 object name provided');
    }

    let s3 = new AWS.S3();

    s3.deleteObject({Bucket: config.awsBucket, Key: objectName}, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}
