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
          stylesData={data?.extras?.phoneButton ? stylesData : undefined}
          extras={data?.extras?.phoneButton ? {...data.extras, text: data.cell_Custom || data.companyCell_Custom, icon: 'phoneButtonIcon'} : undefined}
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {(data.phone || data.companyPhone) && (
        <RenderField
          value={data.phone || data.companyPhone}
          icon="phone"
          phone
          extras={data?.extras?.phoneButton ? {...data.extras, text: data.phone_Custom || data.companyPhone_Custom, icon: 'phoneButtonIcon'} : undefined}
          stylesData={data?.extras?.phoneButton ? stylesData : undefined}
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {data.whatsapp && (
        <RenderField
          value={data.whatsapp}
          icon="whatsapp"
          whatsapp
          extras={data?.extras?.phoneButton ? {...data.extras, text: data.whatsapp_Custom, icon: 'phoneButtonIcon'} : undefined}
          stylesData={data?.extras?.phoneButton ? stylesData : undefined}
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
      {(data.fax || data.companyFax) && (
        <RenderField
          value={data.fax || data.companyFax}
          icon="fax"
          fax
          extras={data?.extras?.phoneButton ? {...data.extras, text: data.fax_Custom || data.companyFax_Custom, icon: 'phoneButtonIcon'} : undefined}
          stylesData={data?.extras?.phoneButton ? stylesData : undefined}
          sx={{...handleFont(stylesData, 'm')}}
        />
      )}
    </Grid>
  );
}
