import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {CustomProps, handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";

export default function RenderEmailWeb({data, stylesData}: CustomProps) {
  return (
    <Grid container spacing={1}>
      {data?.email && (
        <RenderField icon="emailIcon" value={data.email} sx={{...handleFont(stylesData, 'm')}} email/>
      )}
      {data?.web && (
        <Box sx={{width: '100%', mt: '-7px', ml: '7px'}}>
          <RenderField icon="world" value={data.web} sx={{...handleFont(stylesData, 'm')}} link={data.web}/>
        </Box>
      )}
    </Grid>
  );
}
