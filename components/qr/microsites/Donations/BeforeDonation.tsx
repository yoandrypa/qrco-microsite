import React from "react";

import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import CofeeIcon from '@mui/icons-material/Coffee';
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button';

import MainMicroSite from "../MainMicrosite";
import CountField from "./CountField";

import { handleFont } from "../renderers/helper";
import { DonationsProps } from "./types";

export default function BeforeDonation({ data }: DonationsProps) {
  const onDonate = async () => window.open(data.payLynk.url, '_blank');
  const onChangeCount = (value) => {
    data.quantity = value;
    console.log(data);
  }
  console.log(11,data);

  return (
    <MainMicroSite data={data}>
      <CardContent sx={{ height: '100%' }}>
        <Grid container textAlign='center' justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mt: 2, p: 0, ...handleFont(data, 't') }}>
              {data?.title}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ m: 2, p: 0, ...handleFont(data, 'm') }}>
            <Typography sx={{ ...handleFont(data, 'm') }}>{data?.message}</Typography>
          </Grid>

          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            <Grid container>
              <Grid item xs={12}>
                <SvgIcon sx={{ width: 35, height: 35 }}>
                  <CofeeIcon color='primary' />
                </SvgIcon>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ ...handleFont(data, 'm') }}>${data.donationUnitAmount || 1}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign='center' sx={{ ...handleFont(data, 'm') }}>x</Typography>
          </Grid>
          <Grid item xs={7} sx={{ textAlign: 'left' }}>
            <CountField value={data.quantity || 1} onChange={onChangeCount} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
            <Button variant="contained" sx={{ borderRadius: 45, ...handleFont(data, 'b') }} onClick={onDonate}>
              {data.urlOptionLabel || 'Donate'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </MainMicroSite>
  );
}
