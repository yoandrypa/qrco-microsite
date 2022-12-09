import Typography from "@mui/material/Typography";
import {ColorTypes} from "../../types/types";
import Box from "@mui/material/Box";

interface RenderAssetsDescProps {
  newData: {
    title?: string;
    about?: string;
  };
  colors: ColorTypes;
}

export default function RenderTitleDesc({newData, colors}: RenderAssetsDescProps) {
  if (!newData.title && !newData.about) {
    return null;
  }

  return (
    <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
      {newData.title && (
        <Typography sx={{fontWeight: 'bold', fontSize: '24px', color: colors.p}}>{newData.title}</Typography>
      )}
      {newData.about && (
        <Typography sx={{color: colors.p}}>{newData.about}</Typography>
      )}
    </Box>
  )
}
