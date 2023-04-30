import React, { useEffect } from 'react'

import { useRouter } from "next/router";
import { releaseWaiting, startWaiting } from "../../../../../Waiting";
import { payLynkRequest, microSiteUrl } from "../../../../../../utils/requests";
import { setError } from "../../../../../Notification";
import { IViewProps, ISectionData } from "./types";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

export default function Form({ data, index }: IViewProps<ISectionData>) {
  const router = useRouter();
  const callbackUrl = microSiteUrl();
  const { priceId, ownerId } = data || {};
  const { task } = router.query;

  useEffect(() => {
    if (task === undefined) {
      startWaiting();
      payLynkRequest({
        url: 'checkout/sessions',
        method: 'post',
        data: {
          mode: 'payment',
          submit_type: 'pay',
          success_url: `${callbackUrl}?task=success`,
          cancel_url: `${callbackUrl}?task=cancel`,
          line_items: [{ price: priceId, quantity: 1 }],
          ownerId,
        }
      }).then(({ data: { result: checkoutSession } }) => {
        window.open(checkoutSession.url, '_self');
      }).catch((ex: any) => {
        setError(ex);
      }).finally(() => {
        releaseWaiting();
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function renderSuccess() {
    return (
      <Alert variant="standard" sx={{ width: "100%" }} severity="success">
        {'Operation Success task...'}
      </Alert>
    )
  }

  function renderCancel() {
    return (
      <Alert variant="standard" sx={{ width: "100%" }} severity="warning">
        {'Operation Canceled...'}
      </Alert>
    )
  }

  if (task === undefined) return null;

  return (
    <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      {task === 'success' ? renderSuccess() : renderCancel()}
    </Box>
  )
}
