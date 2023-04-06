import React from "react";
import messaging from "@ebanux/ebanux-utils/messaging";

import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';

import QuantityField from "./QuantityField";

import { handleFont } from "../../renderers/helper";
import { DonationsProps } from "./types";
import { microSiteUrl, payLynkRequest } from "../../../../../utils/requests";
import { setError, setWarning } from "../../../../Notification";
import { startWaiting, releaseWaiting } from "../../../../Waiting";

import AmountUnits from "./AmountUnits";
import ButtonDonate from "./ButtonDonate";

export default function BeforeDonation({ data, index, stylesData }: DonationsProps) {
  const msgSenderId = `qr_section_${index}`;

  const onDonate = async () => {
    if (data.isSample) return setWarning(
      'This action is not available in this example.<br/>This is just a preview.'
    );

    const callbackUrl = microSiteUrl();

    startWaiting();
    payLynkRequest({
      url: 'checkout/sessions',
      method: 'post',
      data: {
        mode: 'payment',
        submit_type: 'donate',
        success_url: `${callbackUrl}?thanks=1&idx=${index}`,
        cancel_url: callbackUrl,
        line_items: [{ price: data.priceId, quantity: data.quantity }],
        ownerId: data.ownerId,
      }
    }).then(({ data: { result: checkoutSession } }) => {
      window.open(checkoutSession.url, '_blank');
    }).catch((ex: any) => {
      setError(ex);
    }).finally(() => {
      releaseWaiting();
    });
  }

  const onChangeQuantity = (value: number) => {
    data.quantity = value;
    messaging.emit('onChangeQuantity', value, msgSenderId);
  }

  data.unitAmount = data.unitAmount || 1;
  data.quantity = data.quantity || 1;

  return (
    <Grid container textAlign='center' justifyContent="center" alignItems="center" spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h6' sx={{ mt: 2, p: 0, ...handleFont(stylesData, 't') }}>
          {data.title}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ m: 2, p: '0 !important', ...handleFont(stylesData, 'm') }}>
        <Typography sx={{ ...handleFont(stylesData, 'm') }}>{data.message}</Typography>
      </Grid>

      <Grid item xs={5} sx={{ p: '0 !important' }}>
        <AmountUnits amount={data.unitAmount} coffeeSize={40} stylesData={stylesData} />
      </Grid>
      <Grid item xs={2} sx={{ p: '0 !important' }}>
        <Typography textAlign='center' sx={{ ...handleFont(stylesData, 'm') }}>x</Typography>
      </Grid>
      <Grid item xs={5} sx={{ p: '0 !important' }}>
        <QuantityField value={data.quantity} stylesData={stylesData} onChange={onChangeQuantity} />
      </Grid>

      <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
        <ButtonDonate label={data.buttonText} stylesData={stylesData} onClick={onDonate}
                      amount={data.unitAmount}
                      quantity={data.quantity}
                      msgSenderId={msgSenderId}
        />
      </Grid>
    </Grid>
  );
}
