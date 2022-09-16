import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.REACT_AWS_BUCKET_NAME;
const region = process.env.REACT_AWS_REGION;
const accessKeyId = process.env.REACT_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_AWS_SECRET_ACCESS_KEY;
export const s3Client = new S3({ region, accessKeyId, secretAccessKey });

/*// UPLOAD FILE TO S3
export const uploadFile = (file) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.data,
    Key: file.name,
    ContentLength: file.size,
    ContentType: file.mimetype
  };
  return s3Client.upload(uploadParams).promise().then(res => {
    return res;
  }).catch(err => {
    throw err;
  });
};

// DOWNLOAD FILE FROM S3
export const downloadFile = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };
  return s3Client.getObject(downloadParams).createReadStream();
};*/
