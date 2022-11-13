import Typography from "@mui/material/Typography";
import {ColorTypes} from "../../types/types";
import Box from "@mui/material/Box";

interface RemderAssetsDescProps {
  newData: {
    title?: string;
    description?: string;
  };
  colors: ColorTypes;
}

export default function RenderAssetsDesc({newData, colors}: RemderAssetsDescProps) {
  if (!newData.title && !newData.description) {
    return null;
  }

  return (
    <Box sx={{ my: '10px', px: 2, textAlign: 'center' }}>
      {newData.title && (
        <Typography sx={{fontWeight: 'bold', fontSize: '24px', color: colors.p}}>{newData.title}</Typography>
      )}
      {newData.description && (
        <Typography sx={{color: colors.p}}>{newData.description}</Typography>
      )}
    </Box>
  )
}
