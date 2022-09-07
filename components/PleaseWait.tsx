import Box from '@mui/material/Box';

export default function PleaseWait() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      {'Please wait...'}
    </Box>
  );
}
