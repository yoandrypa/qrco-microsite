import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { CountFieldProps } from "./types";

const btSx = { borderRadius: 45, backgroundColor: 'secondary.main', width: 35, height: 35 };

export default function CountField({ value: initValue, onChange }: CountFieldProps) {
  const [value, setValue] = useState<number>(initValue);

  function onInc() {
    if (value < 100) setValue(value + 1);
  }

  function onDec() {
    if (value > 1) setValue(value - 1);
  }

  return (
    <Grid container sx={{ textAlign: 'center' }}>
      <Grid item xs={4}>
        <Button variant="contained" onClick={onDec} sx={btSx}>-</Button>
      </Grid>

      <Grid item xs={4} sx={{ pl: 1, pr: 1 }}>
        <TextField value={value} size="small" placeholder="25"
                   inputProps={{ min: 1, max: 100, sx: { textAlign: 'center' } }}
                   onChange={onChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Button variant="contained" onClick={onInc} sx={btSx}>+</Button>
      </Grid>
    </Grid>
  )
}