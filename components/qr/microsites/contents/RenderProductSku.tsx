import {CustomProps, handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function RenderProductSku({data, stylesData}: CustomProps) {
  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <TextField sx={{...handleFont(stylesData, 't')}}>{data.sku}</TextField>
      <TextField sx={{...handleFont(stylesData, 't')}}>{data.quantity}</TextField>
    </Box>
  );
}
