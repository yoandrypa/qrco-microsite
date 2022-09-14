import {CustomError} from "../utils";
import {QrOptionsModel} from "../models/qr/QrOptionsModel";
import {OptionsType} from "../components/qr/types/types";

export const createMainDesign = async (mainDesign: OptionsType) => {
  try {
    const design = { ...mainDesign };
    if (design.image === null) {
      design.image = '';
    }
    const item = await QrOptionsModel.create(design);
    debugger;
    return item;
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}
