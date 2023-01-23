import {memo} from "react";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const HeaderHandler = () => {
  return (
    <Box sx={{width: '70px', height: '70px'}}>
      <MusicNoteIcon sx={{fontSize: '50px', mt: '10px', color: theme => theme.palette.primary.light}}/>
    </Box>
  );
}

export default memo(HeaderHandler);
