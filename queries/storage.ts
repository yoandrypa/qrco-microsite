import { s3Client } from "../libs";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export const upload = async (file: File, path: string = "") => {
  try {
    const uploadParams = {
      Bucket: String(process.env.REACT_AWS_BUCKET_NAME),
      Body: file,
      Key: path + "/" + file.name,
      ContentLength: file.size,
      ContentType: file.type
    };
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    return {
      ...response,
      Key: path + "/" + file.name
    };
  } catch (e) {
    return e;
  }
};

export const download = async (key: string) => {
  try {
    const downloadParams = {
      Key: key,
      Bucket: String(process.env.REACT_AWS_BUCKET_NAME)
    };
    const command = new GetObjectCommand(downloadParams);
    return await s3Client.send(command);
  } catch (e) {
    return e;
  }
};

export const remove = (_key: string) => {
  //TODO
};
