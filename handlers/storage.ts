import { CustomError } from "../utils";
import queries from "../queries";

export const upload = async (assets: File[], path = "") => {
  try {
    let files: any[] = [];
    for (const asset of assets) {
      // @ts-ignore
      const res = await queries.storage.upload(asset, path);
      files.push(res);
    }
    return files;
  } catch (e) {
    throw new CustomError("Error uploading files", 500, e);
  }
};

export const download = async (key: string) => {
  try {
    return await queries.storage.download(key);
  } catch (e) {
    throw new CustomError("Error uploading files", 500, e);
  }
};
