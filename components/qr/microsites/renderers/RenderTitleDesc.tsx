import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {handleFont} from "./helper";

interface RenderAssetsDescProps {
  newData: {
    title?: string;
    about?: string;
    titlesFontSize?: "small" | "medium" | "large";
  };
  subtitleType?:  't' | 's' | 'm' | 'b';
  subtitlesFontSize?: "small" | "medium" | "large";
}

export default function RenderTitleDesc({newData, subtitleType,}: RenderAssetsDescProps) {
  if (!newData.title && !newData.about) {
    return null;
  }

  return (
    <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
      {newData.title && (
        <Typography sx={{
          color: theme => theme.palette.primary.main, ...handleFont(newData, 't')
        }}>{newData.title}</Typography>
      )}
      {newData.about && (
        <Typography sx={{ color: theme => theme.palette.primary.main, ...handleFont(newData,subtitleType|| 's' ) }}>{newData.about}</Typography>
      )}
    </Box>
  )
}
