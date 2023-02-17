import Box from "@mui/material/Box";
import {CustomProps, handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import Typography from "@mui/material/Typography";

export default function RenderOrganization({stylesData, data}: CustomProps) {
  return (
    <Box>
      <Grid container spacing={0}>
        {data?.organization && (
          <Grid item xs={!data?.position ? 12 : 6}>
            <Typography sx={{...handleFont(stylesData, 's')}}>Organization</Typography>
            <RenderField value={data.organization} sx={{...handleFont(stylesData, 'm')}}/>
          </Grid>
        )}
        {data?.position && (
          <Grid item xs={!data.organization ? 12 : 6}>
            <Typography sx={{...handleFont(stylesData, 's')}}>Position</Typography>
            <RenderField value={data.position} sx={{...handleFont(stylesData, 'm')}}/>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
