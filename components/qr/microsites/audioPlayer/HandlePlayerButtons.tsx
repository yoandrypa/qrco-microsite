import {memo} from 'react';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

interface Props {
  disabled: boolean;
  playing: boolean;
}

interface HandlePlayerButtonsProps extends Props {
  handlePlayPause: () => void;
}

const HandlePlayerButtons = ({disabled, playing, handlePlayPause}: HandlePlayerButtonsProps) => {
  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <IconButton
        sx={{background: 'azure', border: theme => `solid 1px ${theme.palette.primary.main}`}}
        color="primary"
        disabled={disabled}
        onClick={handlePlayPause}
      >
        {playing ? <PauseIcon/> : <PlayArrowIcon/>}
      </IconButton>
    </Box>
  );
}

function notIf(current: Props, next: Props) {
  return current.disabled === next.disabled && current.playing === next.playing;
}

export default memo(HandlePlayerButtons, notIf);
