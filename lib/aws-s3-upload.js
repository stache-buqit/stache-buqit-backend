'use strict';

const crypto = require('crypto'); // Crypto module for generating random filenames
const AWS = require('aws-sdk'); // Amazon Web Services - Software Development Kit
const s3 = new AWS.S3(); // new S3 object for uploading files

// create a random string for filenames
const randomHexString = (length) =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  });

// Upload to Amazon Web Services
const awsS3Upload = (file) =>
  randomHexString(16)
  .then((filename) => {
    let dir = new Date().toISOString().split('T')[0];
    return {
      ACL: 'public-read', // Permissions on the uploaded file
      Body: file.data, // The file itself to upload
      Bucket: process.env.AWS_S3_BUCKET_NAME, // My bucket on AWS
      ContentType: file.mime, // Unencoded binary data
      Key: `${dir}/${filename}.${file.ext}` // Where it's going in the bucket
    };
  })
  .then((params) =>
    new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    })
  );

module.exports = awsS3Upload;
