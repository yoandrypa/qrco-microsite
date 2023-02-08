import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/system";

import {handleButtons, handleFont} from "../renderers/helper";
import RenderSectWrapper from "../renderers/RenderSectWrapper";

interface RenderActionProps {
  styled: any;
  data?: any;
  isSections?: boolean;
}

export default function RenderActionButton({styled, data, isSections}: RenderActionProps) {
  const theme = useTheme();

  if (!data || !data.urlOptionLink || !data.urlOptionLabel) {
    return null;
  }

  const renderBtn = () => (
    <Grid item xs={12} sx={{textAlign: 'center', pl: '10px'}}>
      <Button
        sx={{my: '10px', width: 'calc(100% - 70px)', ...handleFont(styled, 'b'), ...handleButtons(styled, theme)}}
        target="_blank" component="a" href={data.urlOptionLink}
        variant="contained">{data.urlOptionLabel}</Button>
    </Grid>
  );

  if (isSections) {
    return <RenderSectWrapper>{renderBtn()}</RenderSectWrapper>;
  }

  return renderBtn();
}
