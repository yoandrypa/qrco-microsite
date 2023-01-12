import MarkAsUnreadIcon from "@mui/icons-material/MarkAsUnread";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";
import Box from "@mui/material/Box";

interface EmailWebProps {
  newData: any;
}

export default function RenderEmailWeb({newData}: EmailWebProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <MarkAsUnreadIcon sx={{ color: theme => theme.palette.primary.main }} />
      <Grid container spacing={1} sx={{ mt: '-16px', ml: '1px' }}>
        {newData.email && <RenderField icon="emailIcon" value={newData.email} sx={{...handleFont(newData, 'm')}}/>}
        {newData.web && (
          <Box sx={{width: '100%', mt: '-7px', ml: '7px'}}>
            <RenderField icon="world" value={newData.web} sx={{...handleFont(newData, 'm')}}/>
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
