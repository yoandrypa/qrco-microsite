import RingVolumeIcon from "@mui/icons-material/RingVolume";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";

interface PhonesProps {
  newData: any;
}

export default function RenderPhones({newData}: PhonesProps) {
  return (
    <Grid item xs={12} sx={{display: 'flex'}}>
      <RingVolumeIcon sx={{ color: theme => theme.palette.primary.main, mt: '5px' }} />
      <Grid container spacing={1} sx={{ml: '1px'}}>
        {newData.cell && (
          <RenderField
            value={newData.cell}
            icon="cell"
            size={newData.phone ? 6 : 12}
            sx={{...handleFont(newData, 'm')}} />
        )}
        {newData.phone && (
          <RenderField
            value={newData.phone}
            icon="phone"
            size={newData.cell ? 6 : 12}
            sx={{...handleFont(newData, 'm')}} />
        )}
        {newData.fax && <RenderField value={newData.fax} icon="fax" sx={{...handleFont(newData, 'm')}}/>}
      </Grid>
    </Grid>
  );
}
