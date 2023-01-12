import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import SquareSelector from "../../helperComponents/SquareSelector";
import {useEffect, useState} from "react";

interface EasinessProps {
  newData: any;
}

export default function RenderEasiness({newData}: EasinessProps) {
  const [hideTooltips, setHideTooltips] = useState<boolean>(false);

  const renderEasiness = (item: string, label: string) => (
    <SquareSelector
      selected={false}
      tooltips={!hideTooltips}
      item={item}
      label={label}
    />
  );

  useEffect(() => {
    setHideTooltips(window.top !== window);
  }, []);

  return (
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
    </Grid>
  )
}
