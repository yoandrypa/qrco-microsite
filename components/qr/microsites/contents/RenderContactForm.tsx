/* eslint-disable react/no-unescaped-entities */
import {ChangeEvent, useMemo, useState} from 'react'
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
//@ts-ignore
import session from "@ebanux/ebanux-utils/sessionStorage";
import Notifications, {NotificationsProps} from "../../helperComponents/Notifications";
import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";

const EMAIL = new RegExp("^\\w+(\\.\\w+)*(\\+\\w+(\\.\\w+)*)?@\\w+(\\.\\w+)+$", "i");

function RenderContactForm({data, stylesData}: CustomProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [notify, setNotify] = useState<NotificationsProps | null>(null);
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('')

  const theme = useTheme();

  const inputProps = useMemo(() => ({sx:{ background: '#fff', color: theme.palette.primary.main }}), [theme.palette.primary.main]);
  const sxProps = useMemo(() => ({
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': { borderColor: theme.palette.primary.main }
    }
  }), [theme.palette.primary.main]);

  if (!data) {
    return null;
  }

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const result = await fetch('/api/sendcontactemail', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactEmail: email,
          subject,
          templateData: {
            micrositeUrl: window.location.href,
            message
          }
        })
      });
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

  const error = Boolean(email.trim().length && !EMAIL.test(email));

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
      {data?.visibleReceipt && <Typography sx={{...handleFont(stylesData, 's'), mb: 1}}>{`Receipt: ${data?.email || 'receipt@email.com'}`}</Typography>}
      <Typography sx={{...handleFont(stylesData, 's')}}>Email (Not required)</Typography>
      <TextField
        label=''
        size='small'
        type='email'
        fullWidth
        placeholder='your@email.com'
        value={email}
        error={error}
        helperText={error ? "Check the entered email address" : ""}
        sx={sxProps}
        InputProps={inputProps}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
      />
      <Typography sx={{...handleFont(stylesData, 's')}}>Subject</Typography>
      <TextField
        label=''
        size='small'
        fullWidth
        placeholder={data?.title || ''}
        value={subject}
        sx={sxProps}
        InputProps={inputProps}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setSubject(event.target.value)}
      />
      <Typography sx={{...handleFont(stylesData, 's')}}>Message</Typography>
      <TextField
        label=''
        size='small'
        fullWidth
        multiline
        rows={5}
        placeholder={data?.message || ''}
        value={message}
        sx={sxProps}
        InputProps={inputProps}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
      />

      <LoadingButton loading={isLoading} variant='contained' onClick={handleClick} disabled={error}
                     sx={{...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme), width: '100%', mt: 2}}>
        {data.buttonText || 'Send message'}
      </LoadingButton>
    </Box>
  )
}

export default RenderContactForm
