import React from "react";

import Grid from "@mui/material/Grid";

import { AmountUnitsProps } from "./types";
import SvgIcon from "@mui/material/SvgIcon";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Typography from "@mui/material/Typography";

export default function AmountUnits({ amount, sx, coffeeSize = 35 }: AmountUnitsProps) {
  return (
    <Grid container sx={{ ml: `calc(50% - ${coffeeSize}px)` }}>
      <Grid item xs={12}>
        <SvgIcon sx={{ width: coffeeSize, height: coffeeSize }}>
          <CoffeeIcon color='primary' />
        </SvgIcon>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={sx}>${amount}</Typography>
      </Grid>
    </Grid>
  )
}