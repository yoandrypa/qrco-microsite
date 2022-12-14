import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Box from "@mui/material/Box";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Button from "@mui/material/Button";

import SquareSelector from "../helperComponents/SquareSelector";
import {DAYS} from "../constants";
import {ColorTypes, OpeningObjType} from "../types/types";
import {getColors} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import RenderAddress from "./renderers/RenderAddress";

interface BusinessProps {
  newData: any;
}

export default function Business({newData}: BusinessProps) {
  const colors = getColors(newData) as ColorTypes;

  const renderEasiness = (item: string, label: string) => (
    <SquareSelector
      selected={false}
      tooltips
      item={item}
      label={label}
      colors={colors}
    />
  );

  const handleTiming = (value: string): string => {
    let hours = +value.slice(0, 2);
    let mins = +value.slice(2);
    let minutes = mins < 10 ? `0${mins}` : `${mins}`;
    if (newData.is12hours) {
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
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {(newData.company || newData.title || newData.subtitle || newData.web || newData.email || newData.contact ||
            newData.phone || newData.about) && (
            <>
              <Grid item xs={1}>
                <WorkIcon sx={{color: colors.p}}/>
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1}>
                  <Typography sx={{ fontWeight: 'bold', mt: '10px', ml: '10px' }}>{'Company'}</Typography>
                  {newData.company && <RenderField value={newData.company} sx={{ fontWeight: 'bold', fontSize: '24px', my: '-10px' }}/>}
                  {newData.title && <RenderField value={newData.title} sx={{ fontWeight: 'bold', fontSize: '20px', my: '-10px' }}/>}
                  {newData.subtitle && <RenderField value={newData.subtitle} sx={{ my: '-10px' }}/>}
                  {newData.web && <RenderField value={newData.web} icon="world" color={newData.secondary}/>}
                  {newData.email && <RenderField value={newData.email} icon="emailIcon" color={newData.secondary}/>}
                  {newData.contact && <RenderField value={newData.contact} icon="contact" color={newData.secondary}/>}
                  {newData.phone && <RenderField value={newData.phone} icon="phone" color={newData.secondary}/>}
                  {newData.about && <RenderField value={newData.about} icon="about" color={newData.secondary}/>}
                </Grid>
              </Grid>
            </>
          )}
          {newData.urlOptionLabel && (
            <>
              <Grid item xs={1}/>
              <Grid item xs={11} sx={{ textAlign: 'center' }}>
                <Button
                  target="_blank"
                  component="a"
                  href={newData.urlOptionLink}
                  variant="contained"
                  sx={{
                    my: '10px',
                    width: 'calc(100% - 70px)',
                    color: colors.p,
                    background: colors.s,
                    '&:hover': {color: colors.s, background: colors.p}
                  }}
                >{newData.urlOptionLabel}</Button>
              </Grid>
            </>
          )}
          <RenderAddress newData={newData} colors={colors} />
          {newData.easiness && (
            <>
              <Grid item xs={1}>
                <DoneAllIcon sx={{color: colors.p}}/>
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold', mb: '5px' }}>{'Easiness'}</Typography>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: 'fit-content'
                  // margin: '0 auto'
                }}>
                  {newData.easiness.wifi && renderEasiness('wifi', 'WiFi')}
                  {newData.easiness.accessible && renderEasiness('accessible', 'Accessible')}
                  {newData.easiness.health && renderEasiness('health', 'Health')}
                  {newData.easiness.toilet && renderEasiness('toilet', 'Toilets')}
                  {newData.easiness.seat && renderEasiness('seat', 'Seats')}
                  {newData.easiness.child && renderEasiness('child', 'Children friendly')}
                  {newData.easiness.pets && renderEasiness('pets', 'Pets friendly')}
                  {newData.easiness.park && renderEasiness('park', 'Parks or open spaces')}
                  {newData.easiness.restaurant && renderEasiness('restaurant', 'Restaurant')}
                  {newData.easiness.cafe && renderEasiness('cafe', 'Cafeteria')}
                  {newData.easiness.bar && renderEasiness('bar', 'Bar')}
                  {newData.easiness.fastfood && renderEasiness('fastfood', 'Fast food')}
                  {newData.easiness.bed && renderEasiness('bed', 'Bedrooms')}
                  {newData.easiness.shower && renderEasiness('shower', 'Showers')}
                  {newData.easiness.gym && renderEasiness('gym', 'Sports friendly')}
                  {newData.easiness.smoking && renderEasiness('smoking', 'Smoking areas')}
                  {newData.easiness.climate && renderEasiness('climate', 'Climate')}
                  {newData.easiness.training && renderEasiness('training', 'Training')}
                  {newData.easiness.parking && renderEasiness('parking', 'Parking')}
                  {newData.easiness.train && renderEasiness('train', 'Train')}
                  {newData.easiness.bus && renderEasiness('bus', 'Bus')}
                  {newData.easiness.taxi && renderEasiness('taxi', 'Taxi')}
                </Box>
              </Grid>
            </>)}
          {Object.keys(newData.openingTime || []).length ? (
            <>
            <Grid item xs={1}>
              <ScheduleIcon sx={{color: colors.p}}/>
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ fontWeight: 'bold', }}>{'Opening time'}</Typography>
              <Grid container spacing={1} sx={{ my: 1 }}>
                {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((x: string) => {
                  if (!newData.openingTime[x]) {
                    return null;
                  }
                  return (<Box key={`busines${x}`} sx={{ m: 1 }}>
                    {/* @ts-ignore */}
                    <Typography sx={{fontWeight: 'bold', ml: 2}}>{DAYS[x]}</Typography>
                    {newData.openingTime[x].map((open: OpeningObjType) => {
                      return (<Box sx={{display: 'inline-flex', ml: 2}} key={`day${x}`}>
                        <Box sx={{display: 'inline-flex', mr: '5px'}}>
                          <Typography sx={{mr: '5px'}}>{'From'}</Typography>
                          <Typography sx={{ color: colors.p }}>{handleTiming(open.ini)}</Typography>
                        </Box>
                        <Box sx={{display: 'inline-flex'}}>
                          <Typography sx={{mr: '5px'}}>{'to'}</Typography>
                          <Typography sx={{ color: colors.p }}>{handleTiming(open.end)}</Typography>
                        </Box>
                      </Box>);
                    })}
                  </Box>);
                })
              }
              </Grid>
            </Grid>
            </>
          ) : null}
          <RenderSocials newData={newData} desc="Social networks"/>
        </Grid>
      </Box>
    </MainMicrosite>
  );
}
