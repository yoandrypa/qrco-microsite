import {CustomError} from "../utils";
import {QrOptionsModel} from "../models/qr/QrOptionsModel";
import {BackgroundType, CornersAndDotsType, FramesType, OptionsType} from "../components/qr/types/types";

export const createMainDesign = async (mainDesign: OptionsType) => {
  try {
    const design = { ...mainDesign };
    if (design.image === null) {
      design.image = '';
    }
    return await QrOptionsModel.create(design);;
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}

type updaterType = {
  background?: BackgroundType;
  corners?: CornersAndDotsType;
  cornersDot?: CornersAndDotsType;
  frame?: FramesType;
}

export const updateDesign = async (id: string, incomingDesign: updaterType) => {
  try {
    return await QrOptionsModel.update({ id }, { incomingDesign });
  } catch (error) {
    // @ts-ignore
    throw new CustomError(error.message);
  }
}
