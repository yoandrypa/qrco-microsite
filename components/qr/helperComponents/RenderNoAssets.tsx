import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import {handleFont} from "../microsites/renderers/helper";

interface NoAssetsProps {
  type: string;
  stylesData: any;
}

export default function RenderNoAssets({type, stylesData}: NoAssetsProps) {
  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <WarningAmberIcon color="warning" fontSize="large" />
      <Typography sx={{...handleFont(stylesData, 'm')}}>{`No ${type} files...`}</Typography>
    </Box>
  )
}
