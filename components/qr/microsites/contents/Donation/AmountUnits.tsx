import React from "react";

import Grid from "@mui/material/Grid";

import { AmountUnitsProps } from "./types";
import { handleFont } from "../../renderers/helper";

import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import EbxIcon from "../../../../icons";

export default function AmountUnits({ amount, stylesData, iconSize = 35, iconId = 'Default' }: AmountUnitsProps) {
  const tSx = { ...handleFont(stylesData, 'm') };
  return (
    <Grid container sx={{ ml: `calc(50% - ${iconSize}px)` }}>
      <Grid item xs={12}>
        <SvgIcon sx={{ width: iconSize, height: iconSize }}>
          <EbxIcon iconId={iconId} />
        </SvgIcon>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={tSx}>${amount}</Typography>
      </Grid>
    </Grid>
  )
}