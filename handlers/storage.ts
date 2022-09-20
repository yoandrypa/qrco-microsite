import { CustomError } from "../utils";
import queries from "../queries";

export const upload = (assets: File[], path = "") => {
  try {
    let res: any[] = [];
    assets.forEach(async asset => {
      // @ts-ignore
      res.push(await queries.storage.upload(asset, path));
    });
    return res;
  } catch (e) {
    throw new CustomError("Error uploading files", 500, e);
  }
};

export const download = () => {

};
