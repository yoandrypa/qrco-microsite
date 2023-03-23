import React, { useState, useEffect } from "react";
import messaging from "@ebanux/ebanux-utils/messaging";

import { ButtonDonateProps } from "./types";
import Button from "@mui/material/Button";

const mSubscriptions: any[] = [];

export default function ButtonDonate({ label, totalAmount: initTotalAmount, sx, onClick }: ButtonDonateProps) {
  const [totalAmount, setTotalAmount] = useState<number>(initTotalAmount);

  useEffect(() => {
    // Anything in here is fired on component mount.
    mSubscriptions.push(messaging.setListener('setTotalAmount', setTotalAmount));

    return () => {
      // Anything in here is fired on component unmount.
      messaging.delListener(mSubscriptions);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Button variant="contained" sx={{ borderRadius: 45, ...sx }} onClick={onClick}>
      {label || 'Donate'} ${totalAmount}
    </Button>
  )
}