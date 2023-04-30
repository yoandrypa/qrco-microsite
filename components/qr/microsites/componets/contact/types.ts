import { IQrSection } from '../commons/types';
import { ISectionData } from './section/types';

export type { IIconProps, IViewProps, IQrSetting, IQrSection } from '../commons/types';

export interface IQrData {
  isDynamic: boolean;
  custom: IQrSection<ISectionData>[];
}
