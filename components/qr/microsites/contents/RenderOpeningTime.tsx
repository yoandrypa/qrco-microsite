import ScheduleIcon from "@mui/icons-material/Schedule";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import {DAYS} from "../../constants";
import {OpeningObjType} from "../../types/types";
import LockClockIcon from "@mui/icons-material/LockClock";

interface OpeningTimeProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderOpeningTime({data, styledData, sectionName}: OpeningTimeProps) {
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
    <Grid item xs={12} sx={{display: 'flex'}}>
      <ScheduleIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{mt: '-3px', ...handleFont(styledData, 't')}}>{sectionName || 'Opening time'}</Typography>
        <Grid container spacing={1} sx={{my: 1}}>
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((x: string) => {
            if (!data?.openingTime[x]) {
              return null;
            }
            return (<Box key={`busines${x}`} sx={{m: 1}}> {/* @ts-ignore */}
              <Typography sx={{ml: 2, ...handleFont(styledData, 't')}}>{DAYS[x]}</Typography>
              {(data ? data.openingTime[x] : []).map((open: OpeningObjType) => (
                <Box sx={{display: 'inline-flex', ml: 2}} key={`day${x}`}>
                  <LockClockIcon color="primary" sx={{mr: '5px'}}/>
                  <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(styledData, 'm')}}>
                    {handleTiming(open.ini)}
                  </Typography>
                  <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(styledData, 'm')}}>
                    {`-${handleTiming(open.end)}`}
                  </Typography>
                </Box>)
              )}
            </Box>);
          })}
        </Grid>
      </Box>
    </Grid>
  )
}
