import Grid from "@mui/material/Grid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RenderField from "./RenderField";
import {ColorTypes} from "../../types/types";
import Typography from "@mui/material/Typography";
import {getFont} from "./helper";

interface RenderAddressProps {
  newData: any;
  colors: ColorTypes;
}

export default function RenderAddress({newData, colors}: RenderAddressProps) {
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
        <LocationOnIcon sx={{color: colors.p}}/>
      </Grid>
      <Grid item xs={11}>
        <Typography sx={{ fontWeight: 'bold', fontFamily: getFont(newData) }}>{'Address'}</Typography>
        <Grid container spacing={1}>
          <RenderField value={address} sx={{fontFamily: getFont(newData)}} />
        </Grid>
      </Grid>
    </>
  );
}
