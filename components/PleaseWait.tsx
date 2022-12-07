import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PleaseWaitProps {
  redirecting?: boolean;
  message?: string;
  sx?: object;
}

export default function PleaseWait({redirecting, message, sx}: PleaseWaitProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Typography sx={{textAlign: 'center', ...sx}}>{message || 'Please wait...'}</Typography>
      {redirecting && <Typography sx={{textAlign: 'center'}}>{'Redirecting...'}</Typography>}
    </Box>
  );
}
