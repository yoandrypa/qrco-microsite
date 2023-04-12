import React, { ChangeEvent, ReactNode, useState } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RequiredAdornment from "../helpers/RequiredAdornment";

import { checkValidity, FormatType } from "../helpers/validations";

interface RenderTextFieldsProps {
  label?: string;
  required?: boolean;
  focused?: boolean;
  placeholder?: string;
  onChange: Function;
  isError?: boolean;
  multiline?: boolean;
  value?: string;
  item?: string;
  sx?: any;
  index?: number;
  rows?: number;
  format?: FormatType;
  startAdornment?: ReactNode;
}

export default function TextBox(props: RenderTextFieldsProps) {
  const { value: initValue, onChange, multiline, startAdornment, format, isError, ...staticProps } = props;
  const { required } = staticProps;

  const [value, setValue] = useState<string>(initValue || '');
  const [valid, setValid] = useState<boolean>(checkValidity(initValue, false, 'string', format));

  const onBaseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const newValid = checkValidity(newValue, required, 'string', format);

    setValue(newValue);
    setValid(newValid);
    onChange?.(newValue, newValid);
  }

  return (
    <TextField
      {...staticProps}
      value={value || ''}
      error={isError || !valid}
      multiline={multiline || (staticProps.rows && staticProps.rows > 1) || false}
      fullWidth
      margin="dense"
      size="small"
      onChange={onBaseChange}
      InputProps={{
        startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: required && <RequiredAdornment value={String(value)} />,
      }}
    />
  );
}
