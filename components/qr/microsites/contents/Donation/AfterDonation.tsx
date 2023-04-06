import React, { ChangeEvent } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";

import { DonationsProps } from "./types";
import { handleFont } from "../../renderers/helper";
import { microSiteUrl, msRequest } from "../../../../../utils/requests";

const boxSx = { display: 'flex', justifyContent: 'center' };

export default function AfterDonation({ data, stylesData, index }: DonationsProps) {
  function onChange(attr: string) {
    return (e: ChangeEvent<HTMLInputElement>) => data.review[attr] = e.target.value;
  }

  function onSend() {
    const { contactName, message } = data.review;
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
          microSiteUrl: microSiteUrl(),
        }
      }
    }

    msRequest(options).then((response) => {
      console.log(response);
    });
  }

  data.review = data.review || {};

  return (
    <>
      <Typography variant="h5" textAlign={'center'} sx={{ ...handleFont(stylesData, 'm') }}>
        Thanks for your support!
      </Typography>
      <Box sx={boxSx}>
        <Image width={100} height={100} alt='thanks' src='/images/thanks2.png'></Image>
      </Box>
      <Typography textAlign='center' sx={{ ...handleFont(stylesData, 'm') }}>
        Would you want to say something nice?
      </Typography>
      <Box sx={boxSx}>
        <TextField
          label='Your name'
          variant='outlined'
          fullWidth
          size='small'
          sx={{ mb: 1, ...handleFont(stylesData, 'm') }}
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
          sx={{ ...handleFont(stylesData, 'm') }}
        />
      </Box>
      <Box sx={boxSx}>
        <Button
          variant="contained" sx={{ mt: 2, borderRadius: 45, ...handleFont(stylesData, 'b') }}
          startIcon={<FavoriteIcon />}
          onClick={onSend}
        >
          Send message
        </Button>
      </Box>
    </>
  );
}
