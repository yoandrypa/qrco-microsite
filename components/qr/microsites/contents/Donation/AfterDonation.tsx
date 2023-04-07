import React, { ChangeEvent } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

import { useTheme } from "@mui/system";
import { DonationsProps } from "./types";
import { handleButtons, handleFont } from "../../renderers/helper";
import { microSiteUrl, msRequest } from "../../../../../utils/requests";
import { setSuccess } from "../../../../Notification";

export default function AfterDonation({ data, stylesData, index }: DonationsProps) {
  const theme = useTheme();

  function onChange(attr: string) {
    return (e: ChangeEvent<HTMLInputElement>) => data.review[attr] = e.target.value;
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
      setTimeout(() => window.location.replace(data.website || mSiteUrl), timeout);
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
        <TextField
          label='Your name'
          variant='outlined'
          fullWidth
          size='small'
          sx={tSx}
          placeholder='Anonymous'
          onChange={onChange('contactName')}
        />
      </Box>
      <Box sx={boxSx}>
        <TextField
          fullWidth
          multiline
          onChange={onChange('message')}
          placeholder="I was blown away by the generosity of everyone involved. Thank you for making the difference in the world... "
          rows={4}
          sx={tSx}
        />
      </Box>
      <Box sx={boxSx}>
        <Button variant="contained" sx={bSx} onClick={onSend} startIcon={<FavoriteIcon />}>
          Send message
        </Button>
      </Box>
    </>
  );
}
