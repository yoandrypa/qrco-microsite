import React, { useState, useEffect } from "react";
import messaging from "@ebanux/ebanux-utils/messaging";

import Button from "@mui/material/Button";

import { useTheme } from "@mui/system";
import { handleButtons, handleFont } from "../../../../renderers/helper";
import { IButtonDonate } from "../types";

const mSubscriptions: any[] = [];

export default function ButtonDonate(props: IButtonDonate) {
  const theme = useTheme();
  const { label, amount, quantity: initQuantity, stylesData, onClick, msgSenderId } = props;
  const [quantity, setQuantity] = useState<number>(initQuantity);

  useEffect(() => {
    // Anything in here is fired on component mount.
    mSubscriptions.push(messaging.setListener('onChangeQuantity', setQuantity, msgSenderId));

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
      {label || 'Donate'} ${amount * quantity}
    </Button>
  )
}