import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";

export default function RenderSMSData({data, stylesData}: CustomProps) {
  const theme = useTheme();

  return (
    <Box sx={{width: 'calc(100% - 20px)'}}>
      {data?.visibleReceipt && <Typography sx={{...handleFont(stylesData, 's'), mb: 1}}>{`Receipt: ${data?.cell || ''}`}</Typography>}
      <Typography sx={{...handleFont(stylesData, 'm')}}>SMS</Typography>
      <Button
        variant='contained'
        sx={{...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme), width: '100%', mt: 2}}
        target="_blank"
        component="a"
        href={`sms:${data?.cell}`}
      >
        {data?.buttonText || 'Send SMS'}
      </Button>
    </Box>
  )
}
