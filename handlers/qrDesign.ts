import {CustomError} from "../utils";
import {QrOptionsModel} from "../models/qr/QrOptionsModel";
import {OptionsType, UpdaterType} from "../components/qr/types/types";

export const createMainDesign = async (mainDesign: OptionsType) => {
  try {
    const design = { ...mainDesign };
    if (design.image === null) {
      design.image = '';
    }
    return await QrOptionsModel.create(design);
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}

export const updateDesign = async (id: string, incomingDesign: UpdaterType) => {
  try {
    return await QrOptionsModel.update({ id }, { incomingDesign });
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}
