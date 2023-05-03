import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/system";

import {CustomProps, handleButtons, handleFont} from "../renderers/helper";
import {verifyProtocol} from "../../../../helpers/qr/helpers";

interface ActionProps extends CustomProps {
  avoidPl?: boolean;
}

export default function RenderActionButton({stylesData, data, avoidPl}: ActionProps) {
  const theme = useTheme();

  if (!data || !data.urlOptionLink || !data.urlOptionLabel) {
    return null;
  }

  return (
    <Grid item xs={12} sx={{textAlign: 'center', pl: !avoidPl ? '10px' : undefined}}>
      <Button
        sx={{my: '10px', width: 'calc(100% - 70px)', ...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme)}}
        target="_blank" component="a" href={verifyProtocol(data.urlOptionLink)}
        variant="contained">{data.urlOptionLabel}</Button>
    </Grid>
  );
}
