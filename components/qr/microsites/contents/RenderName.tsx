import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface NameProps {
  newData: any;
  sectionName?: string;
}

export default function RenderName({newData, sectionName}: NameProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex', mb: '10px'}}>
      <AccountBoxIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Box sx={{ml: 1}}>
        {sectionName && (
          <Typography sx={{...handleFont(newData, 't')}}>
            {sectionName}
          </Typography>
        )}
        <Typography sx={{...handleFont(newData, !sectionName ? 't' : 's')}}>
          {`${newData.prefix ? newData.prefix +
            (newData.firstName || newData.lastName ? ', ' : '') : ''}${newData.firstName ?
            newData.firstName + (newData.lastName ? ' ' : '') : ''}${newData.lastName ? newData.lastName : ''}`}
        </Typography>
      </Box>
    </Grid>
  );
}
