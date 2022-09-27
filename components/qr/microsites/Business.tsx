import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import MainMicrosite from "./MainMicrosite";
import RenderSocials from "./renderers/RenderSocials";
import Box from "@mui/material/Box";
import SquareSelector from "../helperComponents/SquareSelector";
import {DAYS} from "../constants";
import {OpeningObjType} from "../types/types";

interface BusinessProps {
  newData: any;
}

export default function Business({newData}: BusinessProps) {
  const renderEasiness = (item: string, label: string) => (
    <SquareSelector
      selected={false}
      tooltips
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

  return (
    <MainMicrosite>
      <CardContent>
        <Grid container spacing={1}>
          {newData.company && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Company" size="small" fullWidth margin="dense" value={newData.company}/>
          </Grid>)}
          {newData.title && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Title" size="small" fullWidth margin="dense" value={newData.title}/>
          </Grid>)}
          {newData.subtitle && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Sub title" size="small" fullWidth margin="dense" value={newData.subtitle}/>
          </Grid>)}
          {newData.web && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Web" size="small" fullWidth margin="dense" value={newData.web}/>
          </Grid>)}
          {newData.email && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Email" size="small" fullWidth margin="dense" value={newData.email}/>
          </Grid>)}
          {newData.contact && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Contact" size="small" fullWidth margin="dense" value={newData.contact}/>
          </Grid>)}
          {newData.phone && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Phone" size="small" fullWidth margin="dense" value={newData.phone}/>
          </Grid>)}
          {newData.about && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="About" size="small" fullWidth margin="dense" value={newData.about}/>
          </Grid>)}
          {newData.address && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Address" size="small" fullWidth margin="dense" value={newData.address}/>
          </Grid>)}
          {newData.city && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="City" size="small" fullWidth margin="dense" value={newData.city}/>
          </Grid>)}
          {newData.zip && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Zip code" size="small" fullWidth margin="dense" value={newData.zip}/>
          </Grid>)}
          {newData.state && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="State/Province" size="small" fullWidth margin="dense" value={newData.state}/>
          </Grid>)}
          {newData.country && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Country" size="small" fullWidth margin="dense" value={newData.country || ""}/>
          </Grid>)}
          {newData.email && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Email" size="small" fullWidth margin="dense" value={newData.email}/>
          </Grid>)}
          {newData.web && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Web" size="small" fullWidth margin="dense" value={newData.web}/>
          </Grid>)}
          {newData.easiness && (
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }}>{'Easiness'}</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content', margin: '0 auto'}}>
              {newData.easiness.wifi && renderEasiness('wifi','WiFi')}
              {newData.easiness.accessible && renderEasiness('accessible','Accessible')}
              {newData.easiness.health && renderEasiness('health','Health')}
              {newData.easiness.toilet && renderEasiness('toilet','Toilets')}
              {newData.easiness.seat && renderEasiness('seat','Seats')}
              {newData.easiness.child && renderEasiness('child','Children friendly')}
              {newData.easiness.pets && renderEasiness('pets','Pets friendly')}
              {newData.easiness.park && renderEasiness('park','Parks or open spaces')}
              {newData.easiness.restaurant && renderEasiness('restaurant','Restaurant')}
              {newData.easiness.cafe && renderEasiness('cafe','Cafeteria')}
              {newData.easiness.bar && renderEasiness('bar','Bar')}
              {newData.easiness.fastfood && renderEasiness('fastfood','Fast food')}
              {newData.easiness.bed && renderEasiness('bed','Bedrooms')}
              {newData.easiness.shower && renderEasiness('shower','Showers')}
              {newData.easiness.gym && renderEasiness('gym','Sports friendly')}
              {newData.easiness.smoking && renderEasiness('smoking','Smoking areas')}
              {newData.easiness.climate && renderEasiness('climate','Climate')}
              {newData.easiness.training && renderEasiness('training','Training')}
              {newData.easiness.parking && renderEasiness('parking','Parking')}
              {newData.easiness.train && renderEasiness('train','Train')}
              {newData.easiness.bus && renderEasiness('bus','Bus')}
              {newData.easiness.taxi && renderEasiness('taxi','Taxi')}
            </Box>
          </Grid>
          )}
          {Object.keys(newData.openingTime || []).length ? (
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 'bold' }}>{'Opening time'}</Typography>
              {Object.keys(newData.openingTime).map((x: string) => {

                return (
                  <>
                    {/* @ts-ignore */}
                    <Typography sx={{ fontWeight: 'bold', ml: 2 }}>{DAYS[x]}</Typography>
                    {newData.openingTime[x].map((open: OpeningType) => {
                      return (<Box sx={{ display: 'inline-flex', ml: 4 }} key={`day${x}`}>
                        {/* @ts-ignore */}
                        <Typography sx={{ display: 'inline-flex', mr: '5px' }}>{'From ' + handleTiming(open.ini)}</Typography>
                        {/* @ts-ignore */}
                        <Typography sx={{ display: 'inline-flex' }}>{' to ' +handleTiming(open.end)}</Typography>
                      </Box>);
                    })}
                  </>
                );
              })}
            </Grid>
          ) : null}
          {newData.company && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Company" size="small" fullWidth margin="dense" value={newData.company}/>
          </Grid>)}
          {newData.address && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Address" size="small" fullWidth margin="dense" value={newData.address}/>
          </Grid>)}
          {newData.city && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="City" size="small" fullWidth margin="dense" value={newData.city}/>
          </Grid>)}
          {newData.zip && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Zip code" size="small" fullWidth margin="dense" value={newData.zip}/>
          </Grid>)}
          {newData.state && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="State/Province" size="small" fullWidth margin="dense" value={newData.state}/>
          </Grid>)}
          {newData.country && (<Grid item xs={12} style={{paddingTop: 0}}>
            <TextField label="Country" size="small" fullWidth margin="dense" value={newData.country}/>
          </Grid>)}
          <RenderSocials newData={newData} />
        </Grid>
      </CardContent>
    </MainMicrosite>
  );
}
