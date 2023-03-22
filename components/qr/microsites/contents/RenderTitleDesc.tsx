import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {CustomProps, handleFont} from "../renderers/helper";

export default function RenderTitleDesc({data, stylesData}: CustomProps) {
  if (!data || (!data.titleAbout && !data.descriptionAbout)) {
    return null;
  }

  return <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
    {data.titleAbout && (
      <Typography sx={{...handleFont(stylesData, 'T')}}>
        {data.titleAbout}
      </Typography>
    )}
    {data.descriptionAbout && (
      <Typography sx={{...handleFont(stylesData,'S' )}}>
        {data.descriptionAbout}
      </Typography>
    )}
  </Box>;
}
