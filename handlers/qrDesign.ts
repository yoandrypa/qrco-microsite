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
    const data = {...incomingDesign} as unknown as OptionsType;
    // @ts-ignore
    if (data.id) { delete data.id; }
    if (data.image === null) { data.image = ''; }
    return await QrOptionsModel.update({ id }, data);
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}
