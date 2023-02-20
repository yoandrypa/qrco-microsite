/* eslint-disable react/no-unescaped-entities */
import {useState} from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
//@ts-ignore
import session from "@ebanux/ebanux-utils/sessionStorage";
import Notifications, {NotificationsProps} from "../../helperComponents/Notifications";
import RenderField from "../renderers/RenderField";
import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import Box from "@mui/material/Box";

function RenderContactForm({data, stylesData}: CustomProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notify, setNotify] = useState<NotificationsProps | null>(null);

  const theme = useTheme();

  if (!data) {
    return null;
  }

  const handleClick = async () => {
    setIsLoading(true)
    const payload = {
      contactEmail: 'info@ebanux.com',
      templateData: {
        contactEmail: data.email,
        name: data.title || 'Contact me',
        micrositeUrl: window.location.href,
        message: data.message
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
          message: `Great! Your message it's been sended successfully.`,
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
          message: `Ops, could not send the message.`,
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
            setIsLoading(false)
          }
        })
      console.log(error)
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
      <RenderField value={data.email} sx={{...handleFont(stylesData, 'm')}} />
      <Typography sx={{...handleFont(stylesData, 's')}}>Subject</Typography>
      <RenderField value={data.title || 'Contact me'} sx={{...handleFont(stylesData, 'm')}} />
      <Typography sx={{...handleFont(stylesData, 's')}}>Message</Typography>
      <RenderField value={data.message} sx={{...handleFont(stylesData, 'm')}} />

      <LoadingButton loading={isLoading} variant='contained' onClick={handleClick}
                     sx={{...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme), width: 'calc(100% - 20px)'}}>
        {data.buttonText || 'Send message'}
      </LoadingButton>
    </Box>
  )
}

export default RenderContactForm
