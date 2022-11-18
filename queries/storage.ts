import { s3Client } from "../libs";
import {
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";

export const download = async (key: string, isSample?: boolean) => {
  try {
    const bucket: string = !isSample
      ? String(process.env.REACT_AWS_BUCKET_NAME)
      : String(process.env.REACT_AWS_SAMPLE_BUCKET_NAME);
    const downloadParams: GetObjectCommandInput = {
      Key: key,
      Bucket: bucket
    };
    return await s3Client.getObject(downloadParams);
  } catch (e) {
    throw e;
  }
};
