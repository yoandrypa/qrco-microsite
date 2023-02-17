import Grid from "@mui/material/Grid";
import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderDate from "./RenderDate";
import Typography from "@mui/material/Typography";

export default function RenderCouponData({stylesData, data}: CustomProps) {
  return (
    <Grid container spacing={1} sx={{ml: 1}}>
      {data?.name && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Coupon code</Typography>
          <RenderField value={data.name} sx={{my: '-10px', ...handleFont(stylesData, 'm')}}/>
        </>
      )}
      {data?.data && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Valid until</Typography>
          <RenderDate data={data.data} stylesData={stylesData} />
        </>
      )}
      {data?.text && (
        <>
          <Typography sx={{...handleFont(stylesData, 's')}}>Terms and conditions</Typography>
          <RenderField value={data.text} sx={{...handleFont(stylesData, 'm')}}/>
        </>
      )}
    </Grid>
  );
}
