import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";

interface OrganizationProps {
  newData: any;
}

export default function RenderOrganization({newData}: OrganizationProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <WorkIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Box sx={{ml: 1}}>
        <Typography sx={{ ...handleFont(newData, 't') }}>{'Organization info'}</Typography>
        <Grid container spacing={0}>
          {newData.organization && (
            <RenderField label="Organization" value={newData.organization} sx={{...handleFont(newData, 'm')}}/>
          )}
          {newData.position && (
            <RenderField label="Position" value={newData.position} sx={{...handleFont(newData, 'm')}}/>
          )}
        </Grid>
      </Box>
    </Grid>
  )
}
