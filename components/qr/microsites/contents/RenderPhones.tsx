import Grid from "@mui/material/Grid";
import RenderField from "../renderers/RenderField";

import {CustomProps, empty, handleFont} from "../renderers/helper";

export default function RenderPhones({data, stylesData}: CustomProps) {
  if (!data || (empty('cell', data) && empty('companyCell', data) && empty('phone', data) &&
    empty('companyPhone', data) && empty('fax', data) && empty( 'companyFax', data) && empty('whatsapp', data))) {
    return null;
  }

  return (
    <Grid container spacing={1} sx={{ml: '1px'}}>
      {(data.cell || data.companyCell) && (
        <RenderField
          value={data.cell || data.companyCell}
          icon="cell"
          phone
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {(data.phone || data.companyPhone) && (
        <RenderField
          value={data.phone || data.companyPhone}
          icon="phone"
          phone
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {data.whatsapp && (
        <RenderField
          value={data.whatsapp}
          icon="whatsapp"
          whatsapp
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {(data.fax || data.companyFax) && (
        <RenderField
          value={data.fax || data.companyFax}
          icon="fax"
          fax
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
    </Grid>
  );
}
