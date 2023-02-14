import Grid from "@mui/material/Grid";
import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderActionButton from "./RenderActionButton";

export default function RenderCouponInfo({stylesData, data}: CustomProps) {
  return (
    <Grid container spacing={1} sx={{ml: 1}}>
      {data?.company &&
        <RenderField value={data.company} sx={{my: '-10px', ...handleFont(stylesData, 'm')}} label="Company"/>}
      {data?.title &&
        <RenderField value={data.title} sx={{my: '-10px', ...handleFont(stylesData, 'm')}} label="Title"/>}
      {data?.description &&
        <RenderField
          value={data.description}
          sx={{my: '-10px', ...handleFont(stylesData, 'm')}}
          label="Description"/>
      }
      {data?.urlOptionLabel && <RenderActionButton stylesData={stylesData} data={data} />}
    </Grid>
  );
}
