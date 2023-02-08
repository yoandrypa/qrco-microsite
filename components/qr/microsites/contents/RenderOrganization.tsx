import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";

interface OrganizationProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderOrganization({styledData, data, sectionName}: OrganizationProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <WorkIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Box sx={{ml: 1}}>
        <Typography sx={{ ...handleFont(styledData, 't') }}>{sectionName || 'Organization info'}</Typography>
        <Grid container spacing={0}>
          {data?.organization && (
            <RenderField label="Organization" value={data.organization} sx={{...handleFont(styledData, 'm')}}/>
          )}
          {data?.position && (
            <RenderField label="Position" value={data.position} sx={{...handleFont(styledData, 'm')}}/>
          )}
        </Grid>
      </Box>
    </Grid>
  )
}
