import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface EmailWebProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderEmailWeb({data, styledData, sectionName}: EmailWebProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', my: 2}}>
      <MarkAsUnreadIcon sx={{ color: theme => theme.palette.primary.main }} />
      <Grid container spacing={1} sx={{ mt: '-16px', ml: '1px' }}>
        {sectionName && <Typography sx={{mb: '5px', ...handleFont(styledData, 't')}}>{sectionName}</Typography>}
        {data?.email && (
          <RenderField icon="emailIcon" value={data.email} sx={{...handleFont(styledData, 'm')}}/>
        )}
        {data?.web && (
          <Box sx={{width: '100%', mt: '-7px', ml: '7px'}}>
            <RenderField icon="world" value={data.web} sx={{...handleFont(styledData, 'm')}}/>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
