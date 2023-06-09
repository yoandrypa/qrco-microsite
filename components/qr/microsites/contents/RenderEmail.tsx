import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {CustomProps, handleFont} from "../renderers/helper";

export default function RenderEmail({data, stylesData}: CustomProps) {
  return (
    <Grid container spacing={1}>
      {data?.email && (
        <RenderField
          icon="emailIcon"
          value={data.email}
          sx={{...handleFont(stylesData, 'm')}}
          stylesData={data?.extras ? stylesData : undefined}
          extras={data?.extras ? {...data.extras, text: data.email_Custom} : undefined}
          email
        />
      )}
    </Grid>
  );
}
