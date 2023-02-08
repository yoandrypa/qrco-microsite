import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface NameProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderName({data, styledData, sectionName}: NameProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', mb: '10px'}}>
      <AccountBoxIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Box sx={{ml: 1}}>
        {sectionName && (
          <Typography sx={{...handleFont(styledData, 't')}}>
            {sectionName}
          </Typography>
        )}
        <Typography sx={{...handleFont(styledData, !sectionName ? 't' : 's')}}>
          {`${data?.prefix ? data.prefix +
            (data?.firstName || data.lastName ? ', ' : '') : ''}${data?.firstName ?
            data.firstName + (data?.lastName ? ' ' : '') : ''}${data?.lastName ? data.lastName : ''}`}
        </Typography>
      </Box>
    </Grid>
  );
}
