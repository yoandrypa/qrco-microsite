import Grid from "@mui/material/Grid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/system";

import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("../renderers/RenderSectWrapper"));

interface RenderAddressProps {
  stylesData: any;
  data?: any;
  isSections?: boolean;
  sectionName?: string;
}

export default function RenderAddress({data, stylesData, isSections, sectionName}: RenderAddressProps) {
  const theme = useTheme();
  if (!data?.address && !data?.address2 && !data?.city && !data?.zip && !data?.state && !data?.country) {
    return null;
  }

  const addSect = (item: string, omitComma?: boolean): string => data[item] ? `${data?.[item]}${!omitComma ? ',' : ''} ` : '';

  let address = `${addSect('address')}${addSect('address2')}${addSect('city')}${addSect('state', true)}${addSect('zip')}${addSect('country')}`;
  if (address.endsWith(', ')) {
    address = address.slice(0, -2);
  }

  const render = () => (
    <Grid item xs={12} sx={{display: 'flex', mt: 2}}>
      <LocationOnIcon sx={{color: theme.palette.primary.main, mt: '5px'}}/>
      <Box sx={{ml: 1}}>
        <Typography sx={{...handleFont(stylesData, 't')}}>{sectionName || 'Address'}</Typography>
        <Grid container spacing={1}>
          <RenderField value={address} sx={{...handleFont(stylesData, 'm')}}/>
        </Grid>
      </Box>
    </Grid>
  );

  if (isSections) {
    return <RenderSectWrapper>{render()}</RenderSectWrapper>;
  }

  return render();
}
