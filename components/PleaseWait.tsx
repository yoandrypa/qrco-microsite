import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PleaseWaitProps {
  redirecting?: boolean;
}

export default function PleaseWait({redirecting}: PleaseWaitProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Typography>{'Please wait...'}</Typography>
      {redirecting && <Typography>{'Redirecting...'}</Typography>}
    </Box>
  );
}
