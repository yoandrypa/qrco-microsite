import React, { useState, useEffect } from "react";
import messaging from "@ebanux/ebanux-utils/messaging";

import Button from "@mui/material/Button";

import { useTheme } from "@mui/system";
import { ButtonDonateProps } from "./types";
import { handleButtons, handleFont } from "../../renderers/helper";

const mSubscriptions: any[] = [];

export default function ButtonDonate({ label, totalAmount: initTotalAmount, stylesData, onClick }: ButtonDonateProps) {
  const theme = useTheme();
  const [totalAmount, setTotalAmount] = useState<number>(initTotalAmount);

  useEffect(() => {
    // Anything in here is fired on component mount.
    mSubscriptions.push(messaging.setListener('setTotalAmount', setTotalAmount));

    return () => {
      // Anything in here is fired on component unmount.
      messaging.delListener(mSubscriptions);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const bSx = {
    backgroundColor: 'secondary.main',
    ...handleFont(stylesData, 'b'),
    ...handleButtons(stylesData, theme),
  };

  return (
    <Button variant="contained" sx={bSx} onClick={onClick}>
      {label || 'Donate'} ${totalAmount}
    </Button>
  )
}