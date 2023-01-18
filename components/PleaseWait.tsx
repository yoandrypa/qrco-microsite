import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PleaseWaitProps {
  redirecting?: boolean;
  message?: string;
  sx?: object;
  ignoreMainSx?: boolean;
}

export default function PleaseWait({redirecting, message, sx, ignoreMainSx}: PleaseWaitProps) {
  return (
    <Box
      sx={!ignoreMainSx ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      } : undefined}
    >
      <Typography sx={{textAlign: 'center', ...sx}}>{message || 'Please wait...'}</Typography>
      {redirecting && <Typography sx={{textAlign: 'center'}}>{'Redirecting...'}</Typography>}
    </Box>
  );
}
