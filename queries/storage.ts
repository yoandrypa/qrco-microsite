import { CustomError } from "../utils";
import { s3Client } from "../libs";
import S3 from "aws-sdk/clients/s3";

export const upload = async (file: File, path: string = "") => {
  const uploadParams: S3.PutObjectRequest = {
    Bucket: String(process.env.REACT_AWS_BUCKET_NAME),
    Body: await file.text(),
    Key: path + "/" + file.name,
    ContentLength: file.size,
    ContentType: file.type
  };
  return s3Client.upload(uploadParams).promise().then(res => {
    return res;
  }).catch(err => {
    throw new CustomError("Error uploading file", 500, err);
  });
};

export const download = (key: string) => {
  //TODO
};

export const remove = (key: string) => {
  //TODO
};
