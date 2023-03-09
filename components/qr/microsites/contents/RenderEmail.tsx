import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {CustomProps, handleFont} from "../renderers/helper";

export default function RenderEmail({data, stylesData}: CustomProps) {
  return (
    <Grid container spacing={1}>
      {data?.email && (
        <RenderField icon="emailIcon" value={data.email} sx={{...handleFont(stylesData, 'm')}} email/>
      )}
    </Grid>
  );
}
