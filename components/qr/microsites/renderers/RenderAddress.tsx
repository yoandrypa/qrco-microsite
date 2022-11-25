import Grid from "@mui/material/Grid";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RenderField from "./RenderField";
import {ColorTypes} from "../../types/types";
import Typography from "@mui/material/Typography";

interface RenderAddressProps {
  newData: any;
  colors: ColorTypes;
}

export default function RenderAddress({newData, colors}: RenderAddressProps) {
  if (!newData.address && !newData.city && !newData.zip && !newData.state && !newData.country) {
    return null;
  }
  return (
    <>
      <Grid item xs={1}>
        <LocationOnIcon sx={{color: colors.p}}/>
      </Grid>
      <Grid item xs={11}>
        <Typography sx={{ fontWeight: 'bold' }}>{'Address'}</Typography>
        <Grid container spacing={1}>
          {newData.address && <RenderField value={newData.address} color={newData.secondary}/>}
          {newData.city && <RenderField value={newData.city} sx={{ mt: '-10px' }}/>}
          {newData.zip && <RenderField value={newData.zip} sx={{ mt: '-10px' }}/>}
          {newData.state && <RenderField value={newData.state} sx={{ mt: '-10px' }}/>}
          {newData.country && <RenderField value={newData.country || ""} sx={{ mt: '-10px' }}/>}
        </Grid>
      </Grid>
    </>
  );
}
