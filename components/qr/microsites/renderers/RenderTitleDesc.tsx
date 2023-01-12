import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import {handleFont} from "./helper";

import dynamic from "next/dynamic";

const RenderSectWrapper = dynamic(() => import("./RenderSectWrapper"));

interface RenderAssetsDescProps {
  newData: {
    titleAbout?: string;
    descriptionAbout?: string;
    titlesFontSize?: "small" | "medium" | "large";
  };
  subtitleType?:  't' | 's' | 'm' | 'b';
  subtitlesFontSize?: "small" | "medium" | "large";
  isSections?: boolean;
}

export default function RenderTitleDesc({newData, subtitleType, isSections}: RenderAssetsDescProps) {
  if (!newData.titleAbout && !newData.descriptionAbout) {
    return null;
  }

  const renderTitleDesc = () => (
    <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
      {newData.titleAbout && (
        <Typography sx={{
          color: theme => theme.palette.primary.main, ...handleFont(newData, 't')
        }}>{newData.titleAbout}</Typography>
      )}
      {newData.descriptionAbout && (
        <Typography sx={{ color: theme => theme.palette.primary.main, ...handleFont(newData,subtitleType|| 's' ) }}>{newData.descriptionAbout}</Typography>
      )}
    </Box>
  );

  if (isSections) {
    return <RenderSectWrapper>{renderTitleDesc()}</RenderSectWrapper>;
  }

  return renderTitleDesc();
}
