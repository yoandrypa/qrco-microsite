import RingVolumeIcon from "@mui/icons-material/RingVolume";
import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";
import {handleFont} from "../renderers/helper";
import Typography from "@mui/material/Typography";

interface PhonesProps {
  data?: any;
  styledData: any;
  sectionName?: string;
}

const empty = (item: string, newData?: any) => newData?.[item] === undefined || !newData[item].trim().length;

export default function RenderPhones({data, styledData, sectionName}: PhonesProps) {
  if (!data || (empty('cell', data) && empty('companyCell', data) && empty('phone', data) &&
    empty('companyPhone', data) && empty('fax', data) && empty( 'companyFax', data))) {
    return null;
  }

  return (
    <Grid item xs={12} sx={{display: 'flex', my: 2}}>
      <RingVolumeIcon sx={{ color: theme => theme.palette.primary.main }} />
      <Grid container spacing={1} sx={{ml: '1px'}}>
        {sectionName && (
          <Grid item xs={12} sx={{mb: '-10px'}}>
            <Typography sx={{mb: '5px', ...handleFont(styledData, 't')}}>{sectionName}</Typography>
          </Grid>
        )}
        {(data.cell || data.companyCell) && (
          <RenderField
            value={data.cell || data.companyCell}
            icon="cell"
            size={data.phone || data.companyPhone ? 6 : 12}
            sx={{...handleFont(styledData, 'm')}}
          />
        )}
        {(data.phone || data.companyPhone) && (
          <RenderField
            value={data.phone || data.companyPhone}
            icon="phone"
            size={data.cell || data.companyCell ? 6 : 12}
            sx={{...handleFont(styledData, 'm')}}
          />
        )}
        {(data.fax || data.companyFax) && (
          <RenderField
            value={data.fax || data.companyFax}
            icon="fax"
            sx={{...handleFont(styledData, 'm')}}
          />
        )}
      </Grid>
    </Grid>
  );
}
