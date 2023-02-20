import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CustomProps, handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import {DAYS} from "../../constants";
import {OpeningObjType} from "../../types/types";
import LockClockIcon from "@mui/icons-material/LockClock";

export default function RenderOpeningTime({data, stylesData}: CustomProps) {
  const handleTiming = (value: string): string => {
    let hours = +value.slice(0, 2);
    let mins = +value.slice(2);
    let minutes = mins < 10 ? `0${mins}` : `${mins}`;
    if (data?.is12hours) {
      if (hours >= 12) {
        hours = 24 - hours;
        hours = 12 - hours;
        minutes += ' pm';
      } else {
        minutes += ' am';
      }
    }
    return `${hours}:${minutes}`;
  }

  return (
    <Grid container spacing={1} sx={{my: 1}}>
      {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((x: string) => {
        if (!data?.openingTime[x]) {
          return null;
        }
        return (<Box key={`opening${x}`} sx={{m: 1}}> {/* @ts-ignore */}
          <Typography sx={{ml: 2, ...handleFont(stylesData, 't')}}>{DAYS[x]}</Typography>
          {data.openingTime[x].map((open: OpeningObjType) => (
            <Box sx={{display: 'inline-flex', ml: 2}} key={`day${x}`}>
              <LockClockIcon color="primary" sx={{mr: '5px'}}/>
              <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(stylesData, 'm')}}>
                {handleTiming(open.ini)}
              </Typography>
              <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(stylesData, 'm')}}>
                {`-${handleTiming(open.end)}`}
              </Typography>
            </Box>)
          )}
        </Box>);
      })}
    </Grid>
  );
}
