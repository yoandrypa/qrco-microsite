import { MouseEvent } from "react";

export interface DonationsProps {
  data: any;
  index: number;
  stylesData: any;
}

export interface CountFieldProps {
  value: number;
  onChange: (value: number) => void;
  stylesData?: any;
}

export interface AmountUnitsProps {
  amount: number;
  coffeeSize?: number;
  stylesData?: any;
}

export interface ButtonDonateProps {
  totalAmount: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  stylesData?: any;
}

