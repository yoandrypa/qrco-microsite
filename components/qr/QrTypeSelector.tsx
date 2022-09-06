// @ts-nocheck

// formerly known as QrTemplate
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QrCodeIcon from '@mui/icons-material/QrCode';

import { handleDesignerString } from '../../helpers/qr/helpers';

import Context from '../context/Context';
import {DataType} from "./types/types";
import RenderTypeSelector from "./helperComponents/RenderTypeSelector";

interface QrTypeSelectorProps {
  setSelected: Function;
  selected?: string | null;
}

const QrTypeSelector = () => {
  const { setSelected, selected }: QrTypeSelectorProps = useContext(Context);

  const handleSelect = (payload: string): void => {
    setSelected((prev: string) => prev === payload ? null : payload);
  };

  return (
    <>
      <Box sx={{ display: 'flex', mb: '10px' }}>
        <QrCodeIcon sx={{ fontSize: '53px', mt: '2px', color: theme => theme.palette.primary.dark }} />
        <Box sx={{ textAlign: 'left', display: 'block' }}>
          <Typography variant="h6">QR type</Typography>
          <Typography>Kind of QR Code to generate</Typography>
        </Box>
      </Box>
      <RenderTypeSelector selected={selected} handleSelect={handleSelect} />
    </>
  );
}

export default QrTypeSelector;
