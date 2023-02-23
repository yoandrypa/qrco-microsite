/* eslint-disable react/no-unescaped-entities */
import React, {ChangeEvent, useState} from 'react'
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
//@ts-ignore
import session from "@ebanux/ebanux-utils/sessionStorage";
import Notifications, {NotificationsProps} from "../../helperComponents/Notifications";
import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";

function RenderContactForm({data, stylesData}: CustomProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notify, setNotify] = useState<NotificationsProps | null>(null);
  const [email, setEmail] = useState<string>(data?.email || '');
  const [subject, setSubject] = useState<string>(data?.title || '');
  const [message, setMessage] = useState<string>(data?.message || '')

  const theme = useTheme();

  if (!data) {
    return null;
  }

  const handleClick = async () => {
    setIsLoading(true)
    const payload = {
      contactEmail: 'info@ebanux.com',
      templateData: {
        contactEmail: email,
        name: subject,
        micrositeUrl: window.location.href,
        message: message
      }
    }

    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    };

    try {
      const result = await fetch('/api/sendcontactemail', options);
      if (result.ok) {
        setNotify({
          message: `Great! Your message has been sent successfully.`,
          severity: 'success',
          showProgress: true,
          title: 'Success',
          onClose: () => {
            setNotify(null);
            setIsLoading(false);
          }
        })
      } else {
        setNotify({
          message: 'Ops, could not send the message.',
          severity: 'error',
          showProgress: false,
          title: 'Error',
          onClose: () => {
            setNotify(null);
            setIsLoading(false);
          }
        });
        console.log(await result.json())
      }
    } catch (error) {
      if (error instanceof Error)
        setNotify({
          message: `Ops, could not send the message. ${error.message}.`,
          severity: 'error',
          showProgress: false,
          title: 'Error',
          onClose: () => {
            setNotify(null);
            setIsLoading(false);
          }
        })
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box>
      {notify && <Notifications
        message={notify.message}
        autoHideDuration={5000}
        severity={notify.severity}
        showProgress={true}
        title={notify.title}
        onClose={() => setNotify(null)}
      />}
      <Typography sx={{...handleFont(stylesData, 's')}}>Email</Typography>
      <TextField
        label=''
        size='small'
        type='email'
        fullWidth
        placeholder='your@email.com'
        value={email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
      />
      <Typography sx={{...handleFont(stylesData, 's')}}>Subject</Typography>
      <TextField
        label=''
        size='small'
        fullWidth
        placeholder='Contact me'
        value={subject}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)}
      />
      <Typography sx={{...handleFont(stylesData, 's')}}>Message</Typography>
      <TextField
        label=''
        size='small'
        fullWidth
        multiline
        rows={5}
        placeholder='Message'
        value={subject}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
      />

      <LoadingButton loading={isLoading} variant='contained' onClick={handleClick}
                     sx={{...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme), width: 'calc(100% - 20px)'}}>
        {data.buttonText || 'Send message'}
      </LoadingButton>
    </Box>
  )
}

export default RenderContactForm