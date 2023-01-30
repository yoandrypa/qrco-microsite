import {memo} from 'react';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {indigo} from "@mui/material/colors";

interface Props {
  disabled: boolean;
  playing: boolean;
}

interface HandlePlayerButtonsProps extends Props {
  handlePlayPause: () => void;
}

const HandlePlayerButtons = ({disabled, playing, handlePlayPause}: HandlePlayerButtonsProps) => {
  return (
    <Box sx={{width: '100px'}}>
      <IconButton
        sx={{
          borderRadius: '5px',
          width: '40px',
          height: '50px',
          background: indigo[400],
          color: '#fff',
          '&:hover': {background: indigo[700], color: indigo[200]},
          border: theme => `solid 1px ${theme.palette.primary.main}`
        }}
        color="primary"
        disabled={disabled}
        onClick={handlePlayPause}
      >
        {playing ? <PauseIcon sx={{fontSize: '35px'}}/> : <PlayArrowIcon sx={{fontSize: '35px'}}/>}
      </IconButton>
    </Box>
  );
}

function notIf(current: Props, next: Props) {
  return current.disabled === next.disabled && current.playing === next.playing;
}

export default memo(HandlePlayerButtons, notIf);
