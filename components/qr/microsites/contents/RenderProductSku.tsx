import {CustomProps, handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RenderProductSku({data, stylesData}: CustomProps) {
  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <Typography sx={{...handleFont(stylesData, 't'), mt: '10px'}}>{data?.sku}</Typography>
      <Typography sx={{...handleFont(stylesData, 't'), mx: '5px'}}>{data?.quantity}</Typography>
    </Box>
  );
}
