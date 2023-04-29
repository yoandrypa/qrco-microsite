import { MouseEvent } from "react";

export type { IIconProps, IViewProps, IQrSetting, IQrSection } from '../../commons/types';

export interface ISectionData {
  title: string;
  buttonText: string;
  message: string;
  unitAmount: number;
  email: string;
  ownerId: string;
  iconId: string;
  productId: string;
  priceId: string;
  review: any;
}

export interface IAmountUnits {
  amount: number;
  iconSize?: number;
  stylesData?: any;
  iconId?: string;
}

export interface IButtonDonate {
  amount: number;
  quantity: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  stylesData?: any;
  msgSenderId: string;
}

export interface ICountField {
  value: number;
  onChange: (value: number) => void;
  stylesData?: any;
}