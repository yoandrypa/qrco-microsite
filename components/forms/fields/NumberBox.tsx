import React, { ChangeEvent, ReactNode, useState } from "react";

import { isEmpty } from "@ebanux/ebanux-utils/utils";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RequiredAdornment from "../helpers/RequiredAdornment";

import { checkValidity } from "../helpers/validations";

interface PropsType {
  label?: string;
  required?: boolean;
  focused?: boolean;
  placeholder?: string;
  onChange: Function;
  isError?: boolean;
  value?: number;
  item?: string;
  sx?: any;
  index?: number;
  min?: number;
  max?: number;
  startAdornment?: ReactNode;
}

export default function NumberBox(props: PropsType) {
  const {
    value: initValue, onChange, startAdornment, isError,
    min = Number.MIN_VALUE, max = Number.MAX_VALUE,
    ...staticProps
  } = props;
  const { required } = staticProps;

  const format = (value: number) => (value >= min && value <= max)

  const [value, setValue] = useState<number>(initValue !== undefined ? initValue : min || 0);
  const [valid, setValid] = useState<boolean>(checkValidity(initValue, false, 'number', format));

  const onBaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, Math.min(max, parseFloat(event.target.value || '0')));
    const newValid = checkValidity(newValue, required, 'number', format);

    setValue(newValue);
    setValid(newValid);
    onChange?.(newValue, newValid);
  }

  return (
    <TextField
      {...staticProps}
      type="number"
      value={isEmpty(value) ? '' : value}
      error={isError || !valid}
      fullWidth
      margin="dense"
      size="small"
      onChange={onBaseChange}
      InputProps={{
        // @ts-ignore
        inputMode: 'numeric', step: "any", pattern: ' ^[-,0-9]+$', min, max,
        startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: required && <RequiredAdornment value={String(value)} />,
      }}
    />
  );
}
