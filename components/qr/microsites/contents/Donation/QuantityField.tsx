import React, { useState, ChangeEvent } from "react";

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useTheme } from "@mui/system";
import { CountFieldProps } from "./types";
import { handleButtons, handleFont } from "../../renderers/helper";

const maxValue = 100;
const btSize = 35;

export default function QuantityField({ value: initValue, stylesData, onChange }: CountFieldProps) {
  const theme = useTheme();
  const [value, setValue] = useState<number>(initValue);

  const clSx = { mr: `calc(50% - ${btSize}px)` };
  const inSx = {
    textAlign: 'center',
    width: btSize,
    height: 16,
    borderRadius: 1,
    bgcolor: 'background.paper',
    color: 'primary.main',
  };
  const btSx = {
    width: btSize, height: 24,
    ...handleFont(stylesData, 'b'),
    ...handleButtons(stylesData, theme),
  };

  function onInc() {
    if (value < maxValue) {
      setValue(value + 1);
      onChange(value + 1);
    }
  }

  function onDec() {
    if (value > 1) {
      setValue(value - 1);
      onChange(value - 1);
    }
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = Math.min(maxValue, parseInt(e.target.value || '1', 10));
    setValue(value);
    onChange(value);
  }

  return (
    <Grid container sx={{ textAlign: 'center' }}>
      <Grid item xs={12} sx={clSx}>
        <Button variant="contained" disabled={value === 100} onClick={onInc} sx={btSx}>+</Button>
      </Grid>

      <Grid item xs={12} sx={{ ...clSx, pt: 1, pb: 1 }}>
        <TextField value={value} size="small" placeholder="25"
                   inputProps={{ min: 1, max: 100, sx: inSx }}
                   onChange={onInputChange}
        />
      </Grid>

      <Grid item xs={12} sx={clSx}>
        <Button variant="contained" disabled={value === 1} onClick={onDec} sx={btSx}>-</Button>
      </Grid>
    </Grid>
  )
}