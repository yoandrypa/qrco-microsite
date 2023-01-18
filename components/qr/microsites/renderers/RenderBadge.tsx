import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface RenderBadgeProps {
  newData: any;
}

export default function RenderBadge({newData}: RenderBadgeProps) {
  // prefix prop aims to badge

  if (newData.prefix === undefined) {
    return null;
  }

  return (
    <Box sx={{
      position: 'fixed',
      marginTop: '-52px',
      padding: '10px',
      background: theme => theme.palette.secondary.main,
      width: 'fit-content',
      borderRadius: '5px', // @ts-ignore
      boxShadow: theme => `5px 5px 2px 1px ${theme.palette.text.disabled}`,
      marginLeft: '10px'
    }}>
      <Typography sx={{color: theme => theme.palette.primary.main, fontWeight: 'bold'}}>{newData.prefix}</Typography>
    </Box>
  );
}
