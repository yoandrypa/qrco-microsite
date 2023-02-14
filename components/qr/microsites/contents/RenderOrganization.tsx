import Box from "@mui/material/Box";
import {CustomProps, handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";

export default function RenderOrganization({stylesData, data}: CustomProps) {
  return (
    <Box>
      <Grid container spacing={0}>
        {data?.organization && (
          <RenderField label="Organization" value={data.organization} sx={{...handleFont(stylesData, 'm')}}/>
        )}
        {data?.position && (
          <RenderField label="Position" value={data.position} sx={{...handleFont(stylesData, 'm')}}/>
        )}
      </Grid>
    </Box>
  )
}
