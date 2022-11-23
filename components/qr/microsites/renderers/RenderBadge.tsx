import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface RenderBadgeProps {
  colors: {
    p: string;
    s: string
  };
  newData: any;
}

export default function RenderBadge({colors, newData}: RenderBadgeProps) {
  // prefix prop aims to badge

  if (newData.prefix === undefined) {
    return null;
  }

  return (
    <Box style={{
      position: 'fixed',
      marginTop: '-52px',
      padding: '10px',
      background: colors?.s,
      width: 'fit-content',
      borderRadius: '5px', // @ts-ignore
      boxShadow: theme => `5px 5px 2px 1px ${theme.palette.text.disabled}`,
      marginLeft: '10px'
    }}>
      <Typography sx={{color: colors?.p, fontWeight: 'bold'}}>{newData.prefix}</Typography>
    </Box>
  );
}
