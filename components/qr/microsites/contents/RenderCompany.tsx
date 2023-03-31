import Grid from "@mui/material/Grid";
import {CustomProps, empty, handleFont} from "../renderers/helper";
import RenderField from "../renderers/RenderField";
import RenderPhones from "./RenderPhones";

export default function RenderCompany({stylesData, data}: CustomProps) {
  return (
    <Grid container spacing={1} sx={{mt: '5px'}}>
      {data?.company &&
        <RenderField value={data.company} sx={{my: '-5px', ...handleFont(stylesData, 's')}}/>}
      {data?.title &&
        <RenderField value={data.title} sx={{my: '-5px', ...handleFont(stylesData, 's')}}/>}
      {data?.subtitle &&
        <RenderField value={data.subtitle} sx={{my: '-5px', ...handleFont(stylesData, 'm')}}/>}
      {data?.companyWebSite &&
        <RenderField
          value={data.companyWebSite}
          icon="world"
          sx={{ml: '0px', ...handleFont(stylesData, 'm')}}
          link={data.companyWebSite}
          stylesData={data?.extras?.emailWebButton ? stylesData : undefined}
          extras={data?.extras?.emailWebButton ? {...data.extras, text: data.companyWebSite_Custom, icon: 'emailWebButtonIcon'} : undefined}
        />}
      {data?.companyEmail &&
        <RenderField
          value={data.companyEmail}
          icon="emailIcon"
          sx={{ml: '0px', ...handleFont(stylesData, 'm')}}
          stylesData={data?.extras?.emailWebButton ? stylesData : undefined}
          extras={data?.extras?.emailWebButton ? {...data.extras, text: data.companyEmail_Custom, icon: 'emailWebButtonIcon'} : undefined}
          email
        />}
      {data?.contact &&
        <RenderField value={data.contact} icon="contact" sx={{...handleFont(stylesData, 'm')}}/>}
      {(!empty('companyCell', data) ||
        !empty('companyPhone', data) ||
        !empty('companyFax', data) ||
        !empty('whatsapp', data)) && (
          <div style={{marginTop: '5px', width: '100%'}}>
            <RenderPhones stylesData={stylesData} data={data} />
          </div>
      )}
      {data?.about &&
        <RenderField value={data.about} icon="about" sx={{...handleFont(stylesData, 'm')}}/>}
    </Grid>
  );
}
