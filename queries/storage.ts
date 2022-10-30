import { s3Client, elastiCacheClient } from "../libs";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import {
  AddTagsToResourceCommand,
  ListTagsForResourceCommand,
  ListTagsForResourceCommandInput,
} from "@aws-sdk/client-elasticache";
import path from "path";

export const upload = (key: string, value: any) => {
  try {
    const uploadParams = {
      ResourceName: process.env.REACT_AWS_ELASTIC_CACHE_RESOURCE_NAME,
      Tags: [
        {
          Key: path.basename(key),
          Value: value
        }],
    };
    const command = new AddTagsToResourceCommand(uploadParams);
    elastiCacheClient.send(command).catch(e => {throw e;});
  } catch (e) {
    throw e;
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
    throw e;
  }
};
