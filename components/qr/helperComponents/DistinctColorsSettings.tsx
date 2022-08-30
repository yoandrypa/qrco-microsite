// @ts-nocheck

import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

import ColorSelector from './ColorSelector';
import QRGeneratorContext from '../context/QRGeneratorContext';

interface DistinctColorsSettingsProps {
  editKind: string;
  setClose: () => void;
};

const DistinctColorsSettings = ({ editKind, setClose }: DistinctColorsSettingsProps) => {
  const { cornersData, setCornersData, dotsData, setDotsData } = useContext(QRGeneratorContext);

  const getData = () => {
    if (editKind === 'corners' && cornersData) {
      return cornersData;
    }
    if (dotsData) {
      return dotsData;
    }
  };

  const handler = (elem: string) => (payload: {color: string} | string) => {
    const [kind, item] = elem.split('.');
    const isCorners = kind === 'corners';
    const mainObj = isCorners ? { ...cornersData } : { ...dotsData };
    mainObj[item] = payload.color || payload;
    if (isCorners) {
      setCornersData(mainObj);
    } else {
      setDotsData(mainObj);
    }
  };

  const data = getData();

  return (
    <Grid item xs={12}>
      <Paper elevation={2} sx={{ p: 2, m: '1px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography>{'Edit'}</Typography>
            <Typography sx={{ ml: '5px', fontWeight: 'bold' }}>{editKind}</Typography>
            <Typography sx={{ ml: '5px' }}>{'colors'}</Typography>
          </Box>
          <Tooltip title={`Close ${editKind} color settings`}>
            <IconButton color="error" onClick={setClose} size="small" sx={{ mt: '-4px' }}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ColorSelector
              label="Top left"
              color={data.topL || '#000000'}
              handleData={handler}
              property={`${editKind}.topL`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ColorSelector
              label="Top right"
              color={data.topR || '#000000'}
              handleData={handler}
              property={`${editKind}.topR`} />
          </Grid>
          <Grid item sm={12} sx={{ pt: '3px' }}>
            <ColorSelector
              label="Bottom left"
              color={data.bottom || '#000000'}
              handleData={handler}
              property={`${editKind}.bottom`} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default DistinctColorsSettings;
