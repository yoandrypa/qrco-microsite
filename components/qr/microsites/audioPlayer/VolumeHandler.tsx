import {memo} from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {alpha} from "@mui/material/styles";

interface VolumeProps {
  volume: number;
  setVolume: (volume: number) => void;
  audio?: HTMLAudioElement;
  sx?: object;
}

const VolumeHandler = ({volume, setVolume, audio, sx}: VolumeProps) => {
  const handleVolume = (event: Event, newValue: number | number[]) => {
    const vol = newValue as number;
    if (audio) {
      audio.volume = vol / 100;
    }
    setVolume(vol);
  };

  return (
    <Box sx={{...sx, width: '100%'}}>
      <Box sx={{width: '100%', display: 'flex'}}>
        <VolumeDownIcon fontSize="small" sx={{
          color: theme => alpha(theme.palette.primary.light, 0.3), mt: '5px'
        }} />
        <Box sx={{width: '100%'}}>
          <Box sx={{width: '100%', position: 'relative'}}>
            <Box sx={{
              top: '5px',
              position: 'absolute',
              width: '100%',
              height: '8px',
              right: '-10px',
              clipPath: 'polygon(0 8px, 100% 8px, 100% 0px)',
              background: theme => alpha(theme.palette.primary.light, 0.3)
            }} />
            <Box sx={{
              top: '17px',
              position: 'absolute',
              width: '100%',
              height: '8px',
              right: '-10px',
              clipPath: 'polygon(0 0, 100% 0, 100% 8px)',
              background: theme => alpha(theme.palette.primary.light, 0.3)
            }} />
          </Box>
          <Slider
            value={volume}
            onChange={handleVolume}
            min={0}
            max={100}
            sx={{mx: '10px'}}
          />
        </Box>
        <VolumeUpIcon sx={{
          color: theme => alpha(theme.palette.primary.light, 0.3), mt: '2px', ml: '20px'
        }} />
      </Box>
    </Box>
  )
}

export default memo(VolumeHandler, (current, next) => current.volume === next.volume);
