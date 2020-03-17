const AWS = require("aws-sdk");
if (process.env.NODE_ENV !== "production") {
  AWS.config.loadFromPath("./config/credentials.json");
}
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singleFileUpload = async file => {
  const { filename, mimetype, createReadStream } = await file;
  const fileStream = createReadStream();
  const path = require("path");
  const Key = new Date().getTime().toString() + path.extname(filename);
  const uploadParams = {
    Bucket: "bitter-app",
    Key,
    Body: fileStream
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Key;
};

module.exports = { s3, singleFileUpload };