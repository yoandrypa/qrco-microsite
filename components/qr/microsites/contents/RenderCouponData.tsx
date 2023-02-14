import Grid from "@mui/material/Grid";
import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderDate from "./RenderDate";

export default function RenderCouponData({stylesData, data}: CustomProps) {
  return (
    <Grid container spacing={1} sx={{ml: 1}}>
      {data?.name &&
        <RenderField value={data.name} sx={{my: '-10px', ...handleFont(stylesData, 'm')}} label="Coupon code"/>}
      {data?.data && <RenderDate data={data.data} stylesData={stylesData} />}
      {data?.text &&
        <RenderField
          value={data.text}
          label="Description"
          sx={{...handleFont(stylesData, 'm')}}/>
      }
    </Grid>
  );
}
