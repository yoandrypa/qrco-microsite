import {useEffect, useState} from "react";
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
import {OpeningObjType} from "../types/types";
import {getFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import RenderAddress from "./renderers/RenderAddress";

interface BusinessProps {
  newData: any;
}

export default function Business({newData}: BusinessProps) {
  const [hideTooltips, setHideTooltips] = useState<boolean>(false);

  const renderEasiness = (item: string, label: string) => (
    <SquareSelector
      selected={false}
      tooltips={!hideTooltips}
      item={item}
      label={label}
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

  useEffect(() => {
    setHideTooltips(window.top !== window);
  }, []);

  return (
    <MainMicrosite data={newData}>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={1}>
          {(newData.company || newData.title || newData.subtitle || newData.web || newData.email || newData.contact ||
            newData.phone || newData.about) && (
            <>
              <Grid item xs={1}>
                <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
              </Grid>
              <Grid item xs={11}>
                <Grid container spacing={1}>
                  <Typography sx={{ fontWeight: 'bold', mt: '10px', ml: '10px', fontFamily: getFont(newData) }}>{'Company'}</Typography>
                  {newData.company && <RenderField value={newData.company} sx={{ fontWeight: 'bold', fontSize: '24px', my: '-10px', fontFamily: getFont(newData) }}/>}
                  {newData.title && <RenderField value={newData.title} sx={{ fontWeight: 'bold', fontSize: '20px', my: '-10px', fontFamily: getFont(newData) }}/>}
                  {newData.subtitle && <RenderField value={newData.subtitle} sx={{ my: '-10px', fontFamily: getFont(newData) }}/>}
                  {newData.web && <RenderField value={newData.web} icon="world" sx={{fontFamily: getFont(newData)}}/>}
                  {newData.email && <RenderField value={newData.email} icon="emailIcon" sx={{fontFamily: getFont(newData)}}/>}
                  {newData.contact && <RenderField value={newData.contact} icon="contact" sx={{fontFamily: getFont(newData)}}/>}
                  {newData.phone && <RenderField value={newData.phone} icon="phone" sx={{fontFamily: getFont(newData)}}/>}
                  {newData.about && <RenderField value={newData.about} icon="about" sx={{fontFamily: getFont(newData)}}/>}
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
                    fontFamily: getFont(newData),
                    my: '10px',
                    width: 'calc(100% - 70px)',
                    color: theme => theme.palette.primary.main,
                    background: theme => theme.palette.secondary.main,
                    '&:hover': {color: theme => theme.palette.secondary.main, background: theme => theme.palette.primary.main}
                  }}
                >{newData.urlOptionLabel}</Button>
              </Grid>
            </>
          )}
          <RenderAddress newData={newData} />
          {newData.easiness && (
            <>
              <Grid item xs={1}>
                <DoneAllIcon sx={{color: theme => theme.palette.primary.main}}/>
              </Grid>
              <Grid item xs={11}>
                <Typography sx={{ fontWeight: 'bold', mb: '5px', fontFamily: getFont(newData) }}>{'Easiness'}</Typography>
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
              <ScheduleIcon sx={{color: theme => theme.palette.primary.main}}/>
            </Grid>
            <Grid item xs={11}>
              <Typography sx={{ fontWeight: 'bold', fontFamily: getFont(newData) }}>{'Opening time'}</Typography>
              <Grid container spacing={1} sx={{ my: 1 }}>
                {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((x: string) => {
                  if (!newData.openingTime[x]) {
                    return null;
                  }
                  return (<Box key={`busines${x}`} sx={{ m: 1 }}>
                    {/* @ts-ignore */}
                    <Typography sx={{fontWeight: 'bold', ml: 2, fontFamily: getFont(newData)}}>{DAYS[x]}</Typography>
                    {newData.openingTime[x].map((open: OpeningObjType) => {
                      return (<Box sx={{display: 'inline-flex', ml: 2}} key={`day${x}`}>
                        <Box sx={{display: 'inline-flex', mr: '5px'}}>
                          <Typography sx={{mr: '5px', fontFamily: getFont(newData)}}>{'From'}</Typography>
                          <Typography sx={{color: theme => theme.palette.primary.main, fontFamily: getFont(newData)}}>{handleTiming(open.ini)}</Typography>
                        </Box>
                        <Box sx={{display: 'inline-flex'}}>
                          <Typography sx={{mr: '5px', fontFamily: getFont(newData)}}>{'to'}</Typography>
                          <Typography sx={{color: theme => theme.palette.primary.main, fontFamily: getFont(newData)}}>{handleTiming(open.end)}</Typography>
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
