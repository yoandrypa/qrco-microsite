import {memo, useRef} from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import {alpha} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

interface VolumeProps {
  volume: number;
  setVolume: (volume: number) => void;
  sx?: object;
}

const VolumeHandler = ({volume, setVolume, sx}: VolumeProps) => {
  const prevVol = useRef<number>(volume);

  const handleVolume = (event: Event, newValue: number | number[]) => {
    const vol = newValue as number;
    prevVol.current = vol;
    setVolume(vol);
  };

  const muteVol = () => {
    if (volume !== 0) {
      setVolume(0);
    } else {
      setVolume(prevVol.current !== 0 ? prevVol.current : 50);
    }
  }

  return (
    <Box sx={{...sx, width: '100%', display: 'flex'}}>
      <Slider
        size="small"
        value={volume}
        onChange={handleVolume}
        min={0}
        max={100}
        sx={{
          width: 'calc(100% - 20px)',
          mt: {sm: 0, xs: '-6px'},
          mr: '10px',
          '& .MuiSlider-rail': {
            height: '15px', borderRadius: 0,
            clipPath: 'polygon(0 15px, 100% 15px, 100% 0px)'
          },
          '& .MuiSlider-track': {
            display: 'none'
          },
          '& .MuiSlider-thumb': {
            borderRadius: 0,
            width: '5px',
            height: '15px'
          }
        }}
      />
      <IconButton sx={{mt: '2px', width: '25px', height: '25px'}} onClick={muteVol}>
        {volume > 0 ? <VolumeUpIcon sx={{color: theme => alpha(theme.palette.primary.light, 0.3)}}/> :
          <VolumeOffIcon sx={{color: theme => alpha(theme.palette.primary.light, 0.3)}}/>}
      </IconButton>
    </Box>
  )
}

export default memo(VolumeHandler, (current, next) => current.volume === next.volume);
