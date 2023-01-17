import RingVolumeIcon from "@mui/icons-material/RingVolume";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";
import Typography from "@mui/material/Typography";

interface PhonesProps {
  newData: any;
  sectionName?: string;
}

const empty = (newData: any, item: string) => newData[item] === undefined || !newData[item].trim().length;

export default function RenderPhones({newData, sectionName}: PhonesProps) {
  if (empty(newData, 'cell') && empty(newData, 'companyCell') && empty(newData, 'phone') &&
    empty(newData, 'companyPhone') && empty(newData, 'fax') && empty(newData, 'companyFax')) {
    return null;
  }

  return (
    <Grid item xs={12} sx={{display: 'flex', my: 2}}>
      <RingVolumeIcon sx={{ color: theme => theme.palette.primary.main }} />
      <Grid container spacing={1} sx={{ml: '1px'}}>
        {sectionName && (
          <Grid item xs={12} sx={{mb: '-10px'}}>
            <Typography sx={{mb: '5px', ...handleFont(newData, 't')}}>{sectionName}</Typography>
          </Grid>
        )}
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
