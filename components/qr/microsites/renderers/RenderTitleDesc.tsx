import Typography from "@mui/material/Typography";
import {ColorTypes} from "../../types/types";
import Box from "@mui/material/Box";
import {getFont} from "./helper";

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
        <Typography sx={{fontWeight: 'bold', fontSize: '24px', color: colors.p, fontFamily: getFont(newData)}}>{newData.title}</Typography>
      )}
      {newData.about && (
        <Typography sx={{color: colors.p, fontFamily: getFont(newData)}}>{newData.about}</Typography>
      )}
    </Box>
  )
}
