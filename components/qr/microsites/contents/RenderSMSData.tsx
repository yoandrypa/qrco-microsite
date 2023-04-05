import {ChangeEvent, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";

export default function RenderSMSData({data, stylesData}: CustomProps) {
  const [message, setMessage] = useState<string>('');

  const theme = useTheme();

  return (
    <Box sx={{width: 'calc(100% - 20px)'}}>
      {data?.visibleReceipt && <Typography sx={{...handleFont(stylesData, 's'), mb: 1}}>{`Receipt: ${data?.cell || ''}`}</Typography>}
      <Typography sx={{...handleFont(stylesData, 'm')}}>SMS</Typography>
      <TextField
        label=''
        size='small'
        fullWidth
        multiline
        rows={5}
        placeholder={data?.message || ''}
        value={message}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: theme.palette.primary.main }
          }
        }}
        InputProps={{sx:{ background: '#fff', color: theme.palette.primary.main }}}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
      />

      <Button
        variant='contained'
        disabled={!message.trim().length}
        sx={{...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme), width: '100%', mt: 2}}
        target="_blank"
        component="a"
        href={`sms:${data?.cell}&body=${encodeURIComponent(message)}`}
      >
        {data?.buttonText || 'Send SMS'}
      </Button>
    </Box>
  )
}
