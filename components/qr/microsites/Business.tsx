import {useCallback, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Box from "@mui/material/Box";
import WorkIcon from "@mui/icons-material/Work";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Button from "@mui/material/Button";
import LockClockIcon from '@mui/icons-material/LockClock';

import SquareSelector from "../helperComponents/SquareSelector";
import {DAYS} from "../constants";
import {OpeningObjType} from "../types/types";
import {handleButtons, handleFont} from "./renderers/helper";
import RenderField from "./renderers/RenderField";
import RenderAddress from "./renderers/RenderAddress";
import {useTheme} from "@mui/system";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("./renderers/RenderSectWrapper"));

interface BusinessProps {
  newData: any;
}

export default function Business({newData}: BusinessProps) {
  const [hideTooltips, setHideTooltips] = useState<boolean>(false);
  const theme = useTheme();

  const isSections = Boolean(newData.layout?.startsWith('sections'));

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

  const renderCompany = useCallback(() => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <WorkIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Grid container spacing={1} sx={{ml: 1}}>
        <Typography sx={{mt: '5px', ...handleFont(newData, 't')}}>{'Company'}</Typography>
        {newData.company && <RenderField value={newData.company} sx={{my: '-10px', ...handleFont(newData, 's')}}/>}
        {newData.title && <RenderField value={newData.title} sx={{my: '-10px', ...handleFont(newData, 's')}}/>}
        {newData.subtitle && <RenderField value={newData.subtitle} sx={{my: '-10px', ...handleFont(newData, 'm')}}/>}
        {newData.web && <RenderField value={newData.web} icon="world" sx={{...handleFont(newData, 'm')}}/>}
        {newData.email && <RenderField value={newData.email} icon="emailIcon" sx={{...handleFont(newData, 'm')}}/>}
        {newData.contact && <RenderField value={newData.contact} icon="contact" sx={{...handleFont(newData, 'm')}}/>}
        {newData.phone && <RenderField value={newData.phone} icon="phone" sx={{...handleFont(newData, 'm')}}/>}
        {newData.about && <RenderField value={newData.about} icon="about" sx={{...handleFont(newData, 'm')}}/>}
      </Grid>
    </Grid>), []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderButton = useCallback(() => (
    <Grid item xs={12} sx={{textAlign: 'center', pl: '10px'}}>
      <Button
        sx={{my: '10px', width: 'calc(100% - 70px)', ...handleFont(newData, 'b'), ...handleButtons(newData, theme)}}
        target="_blank" component="a" href={newData.urlOptionLink}
        variant="contained">{newData.urlOptionLabel}</Button>
    </Grid>), []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderEasinessComponent = useCallback(() => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <DoneAllIcon sx={{color: theme => theme.palette.primary.main, mt: '3px'}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{mb: '5px', ...handleFont(newData, 't')}}>{'Easiness'}</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content'}}>
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
      </Box>
    </Grid>), []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderTiming = useCallback(() => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <ScheduleIcon sx={{color: theme => theme.palette.primary.main}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{mt: '-3px', ...handleFont(newData, 't')}}>{'Opening time'}</Typography>
        <Grid container spacing={1} sx={{my: 1}}>
          {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((x: string) => {
            if (!newData.openingTime[x]) {
              return null;
            }
            return (<Box key={`busines${x}`} sx={{m: 1}}> {/* @ts-ignore */}
              <Typography sx={{ml: 2, ...handleFont(newData, 't')}}>{DAYS[x]}</Typography>
              {newData.openingTime[x].map((open: OpeningObjType) => (
                <Box sx={{display: 'inline-flex', ml: 2}} key={`day${x}`}>
                  <LockClockIcon color="primary" sx={{mr: '5px'}}/>
                  <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(newData, 'm')}}>{handleTiming(open.ini)}</Typography>
                  <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(newData, 'm')}}>{`-${handleTiming(open.end)}`}</Typography>
                </Box>)
              )}
            </Box>);
          })}
        </Grid>
      </Box>
    </Grid>
  ), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MainMicrosite data={newData}>
      <Grid container spacing={1} sx={{p: 2}}>
        {(newData.index || [0, 1, 2, 3, 4, 5]).map((x: number) => (
          <Box key={`item${x}`} sx={{width: '100%', px: 2, my: 2}}>
            {x === 0 && (newData.company || newData.title || newData.subtitle || newData.web || newData.email || newData.contact ||
              newData.phone || newData.about) && (
              !isSections ? renderCompany() : <RenderSectWrapper>{renderCompany()}</RenderSectWrapper>
            )}
            {x === 1 && newData.urlOptionLabel && (
              !isSections ? renderButton() : <RenderSectWrapper>{renderButton()}</RenderSectWrapper>
            )}
            {x === 2 && <RenderAddress newData={newData} isSections={isSections}/>}
            {x === 3 && newData.easiness && (
              !isSections ? renderEasinessComponent() : <RenderSectWrapper>{renderEasinessComponent()}</RenderSectWrapper>
            )}
            {x === 4 && Object.keys(newData.openingTime || []).length ? (
              <>
                {!isSections ? renderTiming() : <RenderSectWrapper>{renderTiming()}</RenderSectWrapper>}
              </>
            ) : null}
            {x === 5 && <RenderSocials newData={newData} desc="Social networks" bold isSections={isSections}/>}
          </Box>
        ))}
      </Grid>
    </MainMicrosite>
  );
}
