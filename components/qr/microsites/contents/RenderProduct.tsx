import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import dynamic from 'next/dynamic';
import RenderTitleDesc from './RenderTitleDesc';
import RenderGallery from './RenderGallery';
import { Grid } from '@mui/material';
import { handleFont } from '../renderers/helper';
interface RenderProductProps {
  newData: any;
  subtitleType?: 't' | 's' | 'm' | 'b';
  isSections?: boolean;
}

export default function RenderProduct({
  newData,
  subtitleType,
  isSections
}: RenderProductProps) {
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RenderTitleDesc
          newData={{
            ...newData,
            titleAbout: newData?.product?.titleAbout || newData.name,
            descriptionAbout: newData?.product?.descriptionAbout||''
          }}
          subtitleType={subtitleType}
          isSections={isSections}
        />
      </Grid>
      {newData?.product?.quantity&&(
      <Grid container item alignItems='center' justifyContent='center'>
        <Typography sx={{...handleFont(newData,'t')}}>
          Quantity:{newData.product.quantity}
        </Typography>
      </Grid>
      )}
      {newData?.product?.sku&&(
      <Grid container item alignItems='center' justifyContent='center'>
        <Typography sx={{...handleFont(newData,'t')}}>
          SKU: {newData.product.sku}
        </Typography>
      </Grid>
      )}
      <Grid item xs={12}>
        <RenderGallery newData={{...newData}} />
      </Grid>

    </Grid>
  );
}
