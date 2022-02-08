const { S3 } = require('aws-sdk');

const s3 = new S3({ signatureVersion: 'v4' });

const saveToS3 = async (fileContent, fileName) => {
  // prepare S3 upload params
  const params = {
    Bucket: 'telegram-commands-bucket',
    Key: fileName,
    Body: fileContent
  };

  // upload file to S3
  const result = await s3.upload(params).promise();

  return result;
};

const getFromS3 = async (key) => {

  // prepare S3 get params
  const params = {
    Bucket: 'telegram-commands-bucket',
    Key: key,
  };

  // get file from S3
  const result = await s3.getObject(params).promise();

  // get content in text format
  const fileContent = result.Body.toString('utf-8');

  return fileContent;

};

module.exports = { getFromS3, saveToS3 };
