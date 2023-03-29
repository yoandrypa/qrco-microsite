import {ReactNode, useMemo} from "react";
import {Paper} from "@mui/material";
import {grey} from "@mui/material/colors";
import {alpha} from "@mui/material/styles";
import {useTheme} from "@mui/system";

interface Props {
  children: ReactNode;
  elevation?: number;
  sx?: object;
  noBackground?: boolean;
  layout?: string;
}

export default function RenderSectWrapper({elevation, children, sx, noBackground, layout}: Props) {
  const theme = useTheme();

  const color = useMemo(() => {
    const index = layout?.indexOf('#') || -1;
    if (index !== -1) {
      const ind = layout?.indexOf('%') || -1;
      if (ind !== -1) {
        return layout?.slice(index, ind);
      }
      return layout?.slice(index);
    }
    return theme.palette.primary.main;
  }, [layout, theme.palette.primary.main]);

  const opacity = useMemo(() => {
    const index = layout?.indexOf('%') || -1;
    return index !== -1 ? +(layout?.slice(index + 1) || 0.5) : 0.5;
  }, [layout]);

  return (
    <Paper elevation={elevation || 3} sx={{
      width: '100%',
      p: 2,
      my: '10px',
      ml: '8px',
      borderRadius: '17px',
      backgroundColor: !noBackground ? alpha(color || grey[500], opacity) : 'unset',
      ...sx
    }}>
      {children}
    </Paper>
  )
};
