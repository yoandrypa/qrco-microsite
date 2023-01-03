import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {handleFont} from "./helper";

interface RenderAssetsDescProps {
  newData: {
    title?: string;
    about?: string;
  };
}

export default function RenderTitleDesc({newData}: RenderAssetsDescProps) {
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
        <Typography sx={{ color: theme => theme.palette.primary.main, ...handleFont(newData, 's') }}>{newData.about}</Typography>
      )}
    </Box>
  )
}
