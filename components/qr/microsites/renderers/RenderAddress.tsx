import Grid from "@mui/material/Grid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RenderField from "./RenderField";
import Typography from "@mui/material/Typography";
import {handleFont} from "./helper";
import {useTheme} from "@mui/system";

interface RenderAddressProps {
  newData: any;
}

export default function RenderAddress({newData}: RenderAddressProps) {
  const theme = useTheme();
  if (!newData.address && !newData.city && !newData.zip && !newData.state && !newData.country) {
    return null;
  }

  const addSect = (item: string, omitComma?: boolean): string => newData[item] ? `${newData[item]}${!omitComma ? ',' : ''} ` : '';

  let address = `${addSect('address')}${addSect('city')}${addSect('state', true)}${addSect('zip')}${addSect('country')}`;
  if (address.endsWith(', ')) {
    address = address.slice(0, -2);
  }

  return (
    <>
      <Grid item xs={1}>
        <LocationOnIcon sx={{color: theme.palette.primary.main, mt: '5px'}}/>
      </Grid>
      <Grid item xs={11}>
        <Typography sx={{...handleFont(newData, 't')}}>{'Address'}</Typography>
        <Grid container spacing={1}>
          <RenderField value={address} sx={{...handleFont(newData, 'm')}} />
        </Grid>
      </Grid>
    </>
  );
}
