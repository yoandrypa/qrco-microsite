import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

import TextBox from "../../../../forms/fields/TextBox";

import { useTheme } from "@mui/system";
import { DonationsProps } from "./types";
import { handleButtons, handleFont } from "../../renderers/helper";
import { microSiteUrl, msRequest } from "../../../../../utils/requests";
import { setSuccess } from "../../../../Notification";

export default function AfterDonation({ data, stylesData, index }: DonationsProps) {
  const theme = useTheme();
  const [valid, setValid] = useState<boolean>(false);

  function onChange(attr: string) {
    return (value: any, valid: boolean) => {
      data.review[attr] = value;
      setValid(valid);
    }
  }

  function onSend() {
    const { contactName, message } = data.review;
    const mSiteUrl = microSiteUrl();
    const options = {
      url: 'send/review/email',
      method: 'post',
      throwError: 'notify',
      data: {
        index,
        subject: 'Review after donation',
        content: {
          contactName: contactName || 'An Anonymous user',
          message,
          microSiteUrl: mSiteUrl,
        }
      }
    }

    msRequest(options).then((response) => {
      const timeout = 5000;
      setSuccess('Your message was sent successfully.', timeout);
      setTimeout(() => window.location.replace(mSiteUrl), timeout);
    });
  }

  data.review = data.review || {};

  const boxSx = { display: 'flex', justifyContent: 'center', mt: 2 };
  const tSx = { ...handleFont(stylesData, 'm') };
  const bSx = {
    backgroundColor: 'secondary.main',
    ...handleFont(stylesData, 'b'),
    ...handleButtons(stylesData, theme),
  };

  return (
    <>
      <Typography variant="h5" textAlign={'center'} sx={tSx}>
        Thanks for your support!
      </Typography>
      <Box sx={boxSx}>
        <Image width={100} height={100} alt='thanks' src='/images/thanks2.png'></Image>
      </Box>
      <Typography textAlign='center' sx={tSx}>
        Would you want to say something nice?
      </Typography>
      <Box sx={boxSx}>
        <TextBox
          label='Your name'
          shrink
          sx={tSx}
          placeholder='Anonymous'
          onChange={onChange('contactName')}
        />
      </Box>
      <Box sx={boxSx}>
        <TextBox
          label='Message'
          placeholder="I was blown away by the generosity of everyone involved. Thank you for making the difference in the world... "
          rows={4}
          sx={tSx}
          required
          onChange={onChange('message')}
        />
      </Box>
      <Box sx={boxSx}>
        <Button variant="contained" sx={bSx} onClick={onSend}
                disabled={!valid} startIcon={<FavoriteIcon />}>
          Send message
        </Button>
      </Box>
    </>
  );
}
