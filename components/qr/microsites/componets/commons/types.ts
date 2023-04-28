import { ReactElement } from "react";

export interface IIconProps {
  enabled: boolean;
  color?: string;
  sx?: Object;
}

export interface IViewProps<IQrData> {
  index?: number;
  data: IQrData;
}

export interface IQrSetting<IQrData> {
  id: string;
  name?: string;
  renderIcon?: (props: IIconProps) => ReactElement;
  renderView: (props: IViewProps<IQrData>) => ReactElement;
}

export interface IQrSection<ISectionData> {
  component: string;
  data: ISectionData;
  expand: string;
  isMonetized?: boolean;
}


