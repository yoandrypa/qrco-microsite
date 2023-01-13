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
        {(newData.cell || newData.companyCell) && (
          <RenderField
            value={newData.cell || newData.companyCell}
            icon="cell"
            size={newData.phone || newData.companyPhone ? 6 : 12}
            sx={{...handleFont(newData, 'm')}}
          />
        )}
        {(newData.phone || newData.companyPhone) && (
          <RenderField
            value={newData.phone || newData.companyPhone}
            icon="phone"
            size={newData.cell || newData.companyCell ? 6 : 12}
            sx={{...handleFont(newData, 'm')}}
          />
        )}
        {(newData.fax || newData.companyFax) && (
          <RenderField
            value={newData.fax || newData.companyFax}
            icon="fax"
            sx={{...handleFont(newData, 'm')}}
          />
        )}
      </Grid>
    </Grid>
  );
}
