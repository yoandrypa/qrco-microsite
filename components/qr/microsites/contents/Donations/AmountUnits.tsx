import React from "react";

import Grid from "@mui/material/Grid";

import { AmountUnitsProps } from "./types";
import { handleFont } from "../../renderers/helper";

import SvgIcon from "@mui/material/SvgIcon";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Typography from "@mui/material/Typography";

export default function AmountUnits({ amount, stylesData, coffeeSize = 35 }: AmountUnitsProps) {
  const tSx = { ...handleFont(stylesData, 'm') };

  return (
    <Grid container sx={{ ml: `calc(50% - ${coffeeSize}px)` }}>
      <Grid item xs={12}>
        <SvgIcon sx={{ width: coffeeSize, height: coffeeSize }}>
          <CoffeeIcon color='secondary' />
        </SvgIcon>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={tSx}>${amount}</Typography>
      </Grid>
    </Grid>
  )
}