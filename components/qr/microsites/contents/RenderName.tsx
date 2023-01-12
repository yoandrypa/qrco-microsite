import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";

interface NameProps {
  newData: any;
}

export default function RenderName({newData}: NameProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <AccountBoxIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Typography sx={{ml: 1, ...handleFont(newData, 't')}}>
        {`${newData.prefix ? newData.prefix +
          (newData.firstName || newData.lastName ? ', ' : '') : ''}${newData.firstName ?
          newData.firstName + (newData.lastName ? ' ' : '') : ''}${newData.lastName ? newData.lastName : ''}`}
      </Typography>
    </Grid>
  )
}
