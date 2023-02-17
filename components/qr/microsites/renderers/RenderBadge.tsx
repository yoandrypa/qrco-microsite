import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {handleButtons, handleFont} from "./helper";
import {useTheme} from "@mui/system";

interface RenderBadgeProps {
  badge?: string;
  stylesData: any;
}

export default function RenderBadge({badge, stylesData}: RenderBadgeProps) {
  const theme = useTheme();

  if (badge === undefined || !badge.trim().length) {
    return null;
  }

  return (
    <Box sx={{
      position: 'fixed',
      marginTop: '-60px',
      padding: '10px',
      background: theme => theme.palette.secondary.main,
      width: 'fit-content',
      borderRadius: '5px', // @ts-ignore
      boxShadow: theme => `5px 5px 2px 1px ${theme.palette.text.disabled}`,
      marginLeft: '25px',
      ...handleFont(stylesData, 'b'), ...handleButtons(stylesData, theme)
    }}>
      <Typography sx={{color: theme => theme.palette.primary.main, fontWeight: 'bold'}}>{badge}</Typography>
    </Box>
  );
}
