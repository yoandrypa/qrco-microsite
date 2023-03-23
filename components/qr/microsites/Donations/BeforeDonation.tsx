import React from "react";
import messaging from "@ebanux/ebanux-utils/messaging";
import { createAxiosInstance } from "@ebanux/ebanux-utils/request";

import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import MainMicroSite from "../MainMicrosite";
import QuantityField from "./QuantityField";

import { handleFont } from "../renderers/helper";
import { DonationsProps } from "./types";

import Notification, { setError } from "../../../Notification";
import Waiting, { startWaiting, releaseWaiting } from "../../../Waiting";
import AmountUnits from "./AmountUnits";
import ButtonDonate from "./ButtonDonate";

const getTotalAmount = (data: any): number => (data.unitAmount) * (data.quantity);

export default function BeforeDonation({ data }: DonationsProps) {
  const onDonate = async () => {
    const callbackUrl = window.location.href.replace(/\?.*/, '');
    const axios = createAxiosInstance(`${process.env.PAYLINK_BASE_URL}/api/v2.0`, false);

    startWaiting();
    axios.post('checkout/sessions', {
      mode: 'payment',
      submit_type: 'donate',
      success_url: `${callbackUrl}?thanks=1`,
      cancel_url: callbackUrl,
      line_items: [{ price: data.priceId, quantity: data.quantity }],
      ownerId: data.ownerId,
    }).then(({ data: { result: checkoutSession } }) => {
      window.open(checkoutSession.url, '_blank');
    }).catch((ex: any) => {
      setError(ex);
    }).finally(() => {
      releaseWaiting();
    });
  }

  const onChangeQuantity = (value) => {
    data.quantity = value;
    messaging.emitMessage('setTotalAmount', getTotalAmount(data));
  }

  data.unitAmount = data.unitAmount || 1;
  data.quantity = data.quantity || 1;

  return (
    <MainMicroSite data={data}>
      <Notification />
      <Waiting />
      <CardContent sx={{ height: '100%' }}>
        <Grid container textAlign='center' justifyContent="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ mt: 2, p: 0, ...handleFont(data, 't') }}>
              {data?.title}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ m: 2, p: '0 !important', ...handleFont(data, 'm') }}>
            <Typography sx={{ ...handleFont(data, 'm') }}>{data?.message}</Typography>
          </Grid>

          <Grid item xs={5} sx={{ p: '0 !important' }}>
            <AmountUnits amount={data.unitAmount} coffeeSize={40} sx={{ ...handleFont(data, 'm') }} />
          </Grid>
          <Grid item xs={2} sx={{ p: '0 !important' }}>
            <Typography textAlign='center' sx={{ ...handleFont(data, 'm') }}>x</Typography>
          </Grid>
          <Grid item xs={5} sx={{ p: '0 !important' }}>
            <QuantityField value={data.quantity} onChange={onChangeQuantity} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
            <ButtonDonate label={data.urlOptionLabel} sx={{ ...handleFont(data, 'b') }} onClick={onDonate}
                          totalAmount={getTotalAmount(data)} />
          </Grid>
        </Grid>
      </CardContent>
    </MainMicroSite>
  );
}
