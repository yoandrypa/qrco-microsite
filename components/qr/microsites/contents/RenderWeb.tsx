import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {CustomProps, handleFont} from "../renderers/helper";

export default function RenderWeb({data, stylesData}: CustomProps) {

  return (
    <Grid container spacing={1}>
      {data?.web && (
        <RenderField icon="web" value={data.web} sx={{...handleFont(stylesData, 'm')}}/>
      )}
    </Grid>
  );
}
