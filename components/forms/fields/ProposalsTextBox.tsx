import React, { ReactNode, useState } from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import RequiredAdornment from "../helpers/RequiredAdornment";

import { checkValidity, FormatType } from "../helpers/validations";

interface PropsType {
  label?: string;
  required?: boolean;
  focused?: boolean;
  placeholder?: string;
  onChange: Function;
  isError?: boolean;
  value?: string;
  item?: string;
  index?: number;
  options: string[];
  format?: FormatType;
  startAdornment?: ReactNode;
}

export default function ProposalsTextBox(props: PropsType) {
  const { value: initValue, onChange, options, startAdornment, format, isError, ...staticProps } = props;
  const { required } = staticProps;

  const [value, setValue] = useState<string>(initValue || '');
  const [valid, setValid] = useState<boolean>(checkValidity(initValue, false, 'string', format));

  const onBaseChange = (event: any, newValue: string) => {
    const newValid = checkValidity(newValue, required, 'string', format);

    setValue(newValue);
    setValid(newValid);
    onChange?.(newValue, newValid);
  }

  return (
    <Autocomplete
      freeSolo
      onChange={onBaseChange}
      onInputChange={onBaseChange}
      disableClearable
      fullWidth
      options={options}
      renderInput={(params) => (
        <TextField
          {...staticProps}
          {...params}
          value={value}
          fullWidth
          size="small"
          margin="dense"
          error={isError || !valid}
          InputProps={{
            ...params.InputProps,
            startAdornment: startAdornment && <InputAdornment position="start">{startAdornment}</InputAdornment>,
            endAdornment: (required && <RequiredAdornment value={value} />),
          }}
        />
      )}
    />
  );
}
