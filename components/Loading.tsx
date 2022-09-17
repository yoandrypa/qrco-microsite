import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Loading = () => (
  <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CircularProgress color="inherit" sx={{ mx: 'auto' }}/>
      <Typography>{'Please wait...'}</Typography>
    </Box>
  </Backdrop>
);

export default Loading;
