import { MouseEvent } from "react";

export interface DonationsProps {
  data: any;
}

export interface CountFieldProps {
  value: number;
  onChange: (value: number) => void;
}

export interface AmountUnitsProps {
  amount: number;
  coffeeSize?: number;
  sx?: any;
}

export interface ButtonDonateProps {
  totalAmount: number;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  sx?: any;
}

