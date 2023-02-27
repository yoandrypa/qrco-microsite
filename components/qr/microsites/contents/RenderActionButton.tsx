import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/system";

import {CustomProps, handleButtons, handleFont} from "../renderers/helper";

export default function RenderActionButton({stylesData, data}: CustomProps) {
  const theme = useTheme();

  if (!data || !data.urlOptionLink || !data.urlOptionLabel) {
    return null;
  }

  return (
    <Grid item xs={12} sx={{textAlign: 'center', pl: '10px'}}>
      <Button
        sx={{my: '10px', width: 'calc(100% - 70px)', ...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme)}}
        target="_blank" component="a" href={data.urlOptionLink}
        variant="contained">{data.urlOptionLabel}</Button>
    </Grid>
  );
}
