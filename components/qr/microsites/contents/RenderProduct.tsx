import Typography from '@mui/material/Typography';
import RenderTitleDesc from './RenderTitleDesc';
import RenderGallery from './RenderGallery';
import { Grid } from '@mui/material';
import { handleFont } from '../renderers/helper';
interface RenderProductProps {
  newData: any;
  isSections?: boolean;
}

export default function RenderProduct({
  newData,
  isSections
}: RenderProductProps) {
  const fontSize =
    (
      Number.parseInt(handleFont(newData, 't').fontSize.split('px')[0]) + 10
    ).toString() + 'px';
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RenderTitleDesc
          data={{
            ...newData,
            titleAbout: newData?.product?.titleAbout || newData.name,
            descriptionAbout: newData?.product?.descriptionAbout || ''
          }}
          styledData={newData}
          isSections={isSections}
        />
      </Grid>
      {newData?.product?.quantity && (
        <Grid container item alignItems="center" justifyContent="center">
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center">
            <Typography sx={{ ...handleFont(newData, 's') }}>
              Quantity:
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center">
            <Typography sx={{ ...handleFont(newData, 't'), fontSize }}>
              {newData.product.quantity}
            </Typography>
          </Grid>
        </Grid>
      )}
      {newData?.product?.sku && (
        <Grid container item alignItems="center" justifyContent="center">
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center">
            <Typography sx={{ ...handleFont(newData, 's') }}>SKU:</Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignItems="center"
            justifyContent="center">
            <Typography sx={{ ...handleFont(newData, 't'), fontSize }}>
              {newData.product.sku}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12}>
        <RenderGallery newData={{ ...newData }} />
      </Grid>
    </Grid>
  );
}
