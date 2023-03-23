import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { CountFieldProps } from "./types";

const maxValue = 100;
const btSize = 35;
const btSx = { borderRadius: 45, backgroundColor: 'secondary.main', width: btSize, height: 24 };
const clSx = { mr: `calc(50% - ${btSize}px)` };
const inSx = { textAlign: 'center', width: 35, height: 16 };

export default function QuantityField({ value: initValue, onChange }: CountFieldProps) {
  const [value, setValue] = useState<number>(initValue);

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

  function onInputChange(e) {
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