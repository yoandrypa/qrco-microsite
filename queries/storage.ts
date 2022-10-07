import { s3Client } from "../libs";
import S3 from "aws-sdk/clients/s3";

export const upload = async (file: File, path: string = "") => {
  const uploadParams: S3.PutObjectRequest = {
    Bucket: String(process.env.REACT_AWS_BUCKET_NAME),
    Body: file,
    Key: path + "/" + file.name,
    ContentLength: file.size,
    ContentType: file.type
  };
  console.debug({ uploadParams });
  return s3Client.upload(uploadParams).promise().then(res => {
    return res;
  }).catch(err => {
    throw err;
  });
};

export const download = (key: string) => {
  const downloadParams = {
    Key: key,
    Bucket: String(process.env.REACT_AWS_BUCKET_NAME)
  };
  return s3Client.getObject(downloadParams).promise().then(res => {
    return res;
  }).catch(err => {
    throw err;
  });
};

export const remove = (key: string) => {
  //TODO
};
