// @ts-nocheck

import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReplayIcon from '@mui/icons-material/Replay';
import { alpha } from '@mui/material/styles';

import ColorSelector from './ColorSelector';
import { BackgroundType } from '../types/types';

interface SettingsProps {
  background: BackgroundType;
  handleBackground: Function;
  handleReset: Function;
  setClose: Function;
};

const Settings = ({ background, handleBackground, handleReset, setClose }: SettingsProps) => {
  const handleData = () => (payload: { color: string; } | string) => {
    handleBackground('backColor')(payload.color ? payload : { color: payload });
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ width: '100%', fontWeight: 'bold' }}>Background Settings</Typography>
        <Box sx={{ display: 'flex', mt: '-10px' }}>
          <Tooltip title="Reset settings">
            <IconButton
              onClick={handleReset}
              size="small"
              color="primary"
              disabled={
                background.size === 1 &&
                (!background.invert && background.opacity === 50) &&
                !background.invert &&
                background.imgSize === 1 &&
                background.x === 0 &&
                background.y === 0
              }>
              <ReplayIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close settings">
            <IconButton color="error" onClick={setClose} size="small" sx={{ mt: '-4px' }}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {!background.invert && (<Paper elevation={2} sx={{ p: 2, py: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 'small', fontWeight: 'bold', color: theme => theme.palette.text.disabled }}>{'Opacity'}</Typography>
          <Typography sx={{ fontSize: 'small', color: theme => theme.palette.text.disabled }}>{`${background.opacity}%`}</Typography>
        </Box>
        <Slider
          value={background.opacity}
          onChange={handleBackground('opacity')}
          step={5}
          size="small"
          marks
          min={0}
          max={100}
        />
      </Paper>)}
      <Paper elevation={2} sx={{ p: 2, py: 1, mt: 1, display: 'flex' }}>
        <Box sx={{ width: background.backColor ? 'calc(100% - 35px)' : '100%' }}>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 'small', fontWeight: 'bold', color: theme => theme.palette.text.disabled }}>{'QR Size'}</Typography>
            <Slider
              value={background.size}
              onChange={handleBackground('size')}
              step={0.25}
              size="small"
              marks
              min={1}
              max={2.5}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '-17px', mb: '10px' }}>
              <Typography sx={{ fontSize: 'small', color: theme => alpha(theme.palette.text.disabled, 0.15) }}>{'Normal'}</Typography>
              <Typography sx={{ fontSize: 'small', color: theme => alpha(theme.palette.text.disabled, 0.15) }}>{'Minimum'}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 'small', fontWeight: 'bold', color: theme => theme.palette.text.disabled }}>{'Image Size'}</Typography>
            <Slider
              value={background.imgSize}
              onChange={handleBackground('imgSize')}
              step={0.05}
              size="small"
              min={0.25}
              max={1.75}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontSize: 'small', fontWeight: 'bold', color: theme => theme.palette.text.disabled }}>{'Image'}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: 'small', color: theme => theme.palette.text.disabled }}>
                {'X position'}
                <ArrowDropDownIcon fontSize="small" sx={{ mb: '-6px' }} />
              </Typography>
              <Typography sx={{ mr: '-16px', fontSize: 'small', color: theme => theme.palette.text.disabled }}>
                {'Y position'}
                <ArrowRightIcon fontSize="small" sx={{ mb: '-6px' }} />
              </Typography>
            </Box>
            <Slider
              value={background.x}
              onChange={handleBackground('x')}
              size="small"
              min={-90}
              max={90}
            />
          </Box>
        </Box>
        <Box sx={{ height: '200px', ml: 2, mt: '7px' }}>
          <Slider
            value={background.y}
            onChange={handleBackground('y')}
            size="small"
            min={-90}
            max={90}
            orientation="vertical"
          />
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ p: 2, py: 1, mt: 1 }}>
        <FormControlLabel control={<Switch checked={Boolean(background.invert)} onChange={handleBackground('invert')} />} label="Invert code colors with background" />
        {background.backColor ? (<>
          <ColorSelector
            label="Background color"
            color={background.backColor}
            handleData={handleData}
            property="background.backColor"
          />
        </>) : (
          <Typography sx={{ fontSize: 'small', color: theme => theme.palette.text.disabled }}>
            {'The image has no transparency, therefore no background color can be applied.'}
          </Typography>
        )}
      </Paper>
    </>
  );
};

export default Settings;
