import DoneAllIcon from "@mui/icons-material/DoneAll";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import Grid from "@mui/material/Grid";
import SquareSelector from "../../helperComponents/SquareSelector";
import {useEffect, useState} from "react";

interface EasinessProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

export default function RenderEasiness({data, styledData, sectionName}: EasinessProps) {
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
        <Typography sx={{mb: '5px', ...handleFont(styledData, 't')}}>{sectionName || 'Easiness'}</Typography>
        <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: 'fit-content'}}>
          {data?.easiness?.wifi && renderEasiness('wifi', 'WiFi')}
          {data?.easiness?.accessible && renderEasiness('accessible', 'Accessible')}
          {data?.easiness?.health && renderEasiness('health', 'Health')}
          {data?.easiness?.toilet && renderEasiness('toilet', 'Toilets')}
          {data?.easiness?.seat && renderEasiness('seat', 'Seats')}
          {data?.easiness?.child && renderEasiness('child', 'Children friendly')}
          {data?.easiness?.pets && renderEasiness('pets', 'Pets friendly')}
          {data?.easiness?.park && renderEasiness('park', 'Parks or open spaces')}
          {data?.easiness?.restaurant && renderEasiness('restaurant', 'Restaurant')}
          {data?.easiness?.cafe && renderEasiness('cafe', 'Cafeteria')}
          {data?.easiness?.bar && renderEasiness('bar', 'Bar')}
          {data?.easiness?.fastfood && renderEasiness('fastfood', 'Fast food')}
          {data?.easiness?.bed && renderEasiness('bed', 'Bedrooms')}
          {data?.easiness?.shower && renderEasiness('shower', 'Showers')}
          {data?.easiness?.gym && renderEasiness('gym', 'Sports friendly')}
          {data?.easiness?.smoking && renderEasiness('smoking', 'Smoking areas')}
          {data?.easiness?.climate && renderEasiness('climate', 'Climate')}
          {data?.easiness?.training && renderEasiness('training', 'Training')}
          {data?.easiness?.parking && renderEasiness('parking', 'Parking')}
          {data?.easiness?.train && renderEasiness('train', 'Train')}
          {data?.easiness?.bus && renderEasiness('bus', 'Bus')}
          {data?.easiness?.taxi && renderEasiness('taxi', 'Taxi')}
        </Box>
      </Box>
    </Grid>
  )
}
