import { CustomError } from "../utils";
import { s3Client } from "../libs";

export const upload = async (file: File) => {
  const uploadParams = {
    Bucket: process.env.REACT_AWS_BUCKET_NAME,
    Body: await file.text(),
    Key: "/QrLink/assets/" + file.name,
    ContentLength: file.size,
    ContentType: file.type
  };
  // @ts-ignore
  return s3Client.upload(uploadParams, (err, data) => {
    /*if (err) {
      throw new CustomError("Error uploading QR", 500, err);
    }*/
    return data;
  });
};
