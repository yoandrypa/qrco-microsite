import React, { useState } from 'react'

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextBox from "../../../../../forms/fields/TextBox";

import { useTheme } from "@mui/system";
import { handleButtons, handleFont } from "../../../renderers/helper";
import { msRequest } from "../../../../../../utils/requests";
import { releaseWaiting, startWaiting } from "../../../../../Waiting";
import { setError, setSuccess } from "../../../../../Notification";
import { parseFormFieldStyle } from "../../commons/helpers";
import { IViewProps, ISectionData } from "./types";


export default function Form({ data: designData, stylesData, index }: IViewProps<ISectionData>) {
  const theme = useTheme();

  const [formData] = useState<any>({});
  const [disabled, setDisabled] = useState<boolean>(true);

  const tSx = parseFormFieldStyle(stylesData);
  const bSx = {
    backgroundColor: 'secondary.main',
    ...handleFont(stylesData, 'b'),
    ...handleButtons(stylesData, theme),
  };

  const { recipientEmail, recipientVisible, messagePlaceholder, subjectPlaceholder, buttonText } = designData;

  const onChange = (attr: string) => (value: any, valid: boolean) => {
    formData[attr] = value;
    if (attr === 'message') setDisabled(!valid);
  }

  function onSend() {
    const { subject, message, contactEmail } = formData;

    startWaiting();
    msRequest({
      url: 'send/contact/email',
      method: 'POST',
      data: {
        index,
        subject,
        content: {
          message,
          contactEmail,
          microSiteUrl: window.location.href,
        }
      }
    }).then(() => {
      setSuccess('Great! Your message has been sent successfully.', 8000);
    }).catch((err: any) => {
      setError(err);
    }).finally(() => {
      releaseWaiting();
    })
  }

  function renderRecipient() {
    if (!recipientVisible) return (
      <Grid item xs={12}>
        <TextBox label='Receipt' value={recipientEmail} sx={tSx} shrink disabled />
      </Grid>
    )
  }

  return (
    <Box>
      <Grid container textAlign='center' justifyContent="center" alignItems="center" spacing={1}>
        {renderRecipient()}
        <Grid item xs={12}>
          <TextBox
            label='Email' required shrink sx={tSx}
            placeholder='your@email.com'
            format={/^\w+(\.\w+)*(\+\w+(\.\w+)*)?@\w+(\.\w+)+$/}
            onChange={onChange('contactEmail')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextBox
            label='Subject' required shrink sx={tSx}
            placeholder={subjectPlaceholder}
            onChange={onChange('subject')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextBox
            label='Message' required shrink sx={tSx}
            rows={5}
            placeholder={messagePlaceholder}
            onChange={onChange('message')}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, textAlign: 'center' }}>
          <Button variant="contained" sx={bSx} onClick={onSend} disabled={disabled}>
            {buttonText || 'Send message'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
