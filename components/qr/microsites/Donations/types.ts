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
  initTotalAmount: number;
  onClick: Function
  label?: string;
  sx?: any;
}

