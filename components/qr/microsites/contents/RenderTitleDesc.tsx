import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {handleFont} from "../renderers/helper";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("../renderers/RenderSectWrapper"));

interface RenderTitleDescProps {
  data?: any;
  styledData: any;
  isSections?: boolean;
}

export default function RenderTitleDesc({data, styledData, isSections}: RenderTitleDescProps) {
  if (!data || (!data.titleAbout && !data.descriptionAbout)) {
    return null;
  }

  const renderTitleDesc = () => (
    <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
      {data.titleAbout && (
        <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(styledData, 't')}}>
          {data.titleAbout}
        </Typography>
      )}
      {data.descriptionAbout && (
        <Typography sx={{color: theme => theme.palette.primary.main, ...handleFont(styledData,'s' )}}>
          {data.descriptionAbout}
        </Typography>
      )}
    </Box>
  );

  if (isSections) {
    return <RenderSectWrapper>{renderTitleDesc()}</RenderSectWrapper>;
  }

  return renderTitleDesc();
}
