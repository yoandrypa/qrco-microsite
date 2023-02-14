import Grid from "@mui/material/Grid";
import {CustomProps, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";

export default function RenderCompany({stylesData, data}: CustomProps) {
  return (
    <Grid container spacing={1}>
      {data?.company &&
        <RenderField value={data.company} sx={{my: '-10px', ...handleFont(stylesData, 's')}}/>}
      {data?.title &&
        <RenderField value={data.title} sx={{my: '-10px', ...handleFont(stylesData, 's')}}/>}
      {data?.subtitle &&
        <RenderField value={data.subtitle} sx={{my: '-10px', ...handleFont(stylesData, 'm')}}/>}
      {data?.companyWebSite &&
        <RenderField value={data.companyWebSite} icon="world" sx={{...handleFont(stylesData, 'm')}}/>}
      {data?.companyEmail &&
        <RenderField value={data.companyEmail} icon="emailIcon" sx={{...handleFont(stylesData, 'm')}}/>}
      {data?.contact &&
        <RenderField value={data.contact} icon="contact" sx={{...handleFont(stylesData, 'm')}}/>}
      {data?.about &&
        <RenderField value={data.about} icon="about" sx={{...handleFont(stylesData, 'm')}}/>}
    </Grid>
  );
}
