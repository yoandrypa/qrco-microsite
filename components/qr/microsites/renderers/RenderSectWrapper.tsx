import {ReactNode} from "react";
import {Paper} from "@mui/material";
import {grey} from "@mui/material/colors";

interface Props {
  children: ReactNode;
  elevation?: number;
  sx?: object;
  noBackground?: boolean;
}

export default function RenderSectWrapper({elevation, children, sx, noBackground}: Props) {
  return (
    <Paper elevation={elevation || 3} sx={{
      width: '100%',
      p: 2,
      my: '10px',
      ml: '8px',
      borderRadius: '17px',
      background: !noBackground ? grey[300] : 'unset',
      ...sx
    }}>
      {children}
    </Paper>
  )
};
