import Grid from "@mui/material/Grid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RenderField from "../renderers/RenderField";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import Box from "@mui/material/Box";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("../renderers/RenderSectWrapper"));

interface RenderAddressProps {
  newData: any;
  isSections?: boolean;
}

export default function RenderAddress({newData, isSections}: RenderAddressProps) {
  const theme = useTheme();
  if (!newData.address && !newData.city && !newData.zip && !newData.state && !newData.country) {
    return null;
  }

  const addSect = (item: string, omitComma?: boolean): string => newData[item] ? `${newData[item]}${!omitComma ? ',' : ''} ` : '';

  let address = `${addSect('address')}${addSect('address2')}${addSect('city')}${addSect('state', true)}${addSect('zip')}${addSect('country')}`;
  if (address.endsWith(', ')) {
    address = address.slice(0, -2);
  }

  const render = () => (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <LocationOnIcon sx={{color: theme.palette.primary.main, mt: '-10px'}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{...handleFont(newData, 't')}}>{'Address'}</Typography>
        <Grid container spacing={1}>
          <RenderField value={address} sx={{...handleFont(newData, 'm')}}/>
        </Grid>
      </Box>
    </Grid>
  );

  if (isSections) {
    return <RenderSectWrapper>{render()}</RenderSectWrapper>;
  }

  return render();
}
