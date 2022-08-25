import { useRef, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import QRGeneratorContext from '../../components/qr/context/QRGeneratorContext';
import QrTypeSelector from '../../components/qr/QrTypeSelector';
import initialData, { initialBackground, initialFrame } from '../../helpers/qr/data';
import { OptionsType } from '../../components/qr/types/types';

const handleInitialData = (value: string | null | undefined) => {
  if (!value) {
    return JSON.parse(JSON.stringify(initialData));
  }
  const opts = JSON.parse(JSON.stringify(initialData));
  opts.data = value;
  return opts;
};

export default function QrGen() {
  const [value, setValue] = useState<string>('Ebanux');
  const [data, setData] = useState({});
  const [options, setOptions] = useState<OptionsType>(handleInitialData(value));
  const [logoData, setLogoData] = useState(null);
  const [background, setBackground] = useState(initialBackground);
  const [cornersData, setCornersData] = useState(null);
  const [dotsData, setDotsData] = useState(null);
  const [frame, setFrame] = useState(initialFrame);
  const [tabSelected, setTabtabSelected] = useState(0);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const doneInitialRender = useRef<boolean>(false);
  const forceOpenDesigner = useRef<boolean>(false);

  const handleOpenDesigner = (payload: string | null) => {
    if (payload !== value) {
      forceOpenDesigner.current = true;
      setOptions({ ...options, data: !selected ? value : payload });
    } else {
      setTabtabSelected(1);
    }
  };

  return (
    <Container>
      <QRGeneratorContext.Provider value={{ cornersData, setCornersData, dotsData, setDotsData }}>
        <Box sx={{ p: 1, width: { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto' }}>
          <h1>QR Generator</h1>
          <QrTypeSelector
            data={data}
            expanded={expanded}
            setOpenDesigner={handleOpenDesigner}
            setData={setData}
            setExpanded={setExpanded}
            setSelected={setSelected}
            setValue={setValue}
            selected={selected}
            value={value}
          />
        </Box>
      </QRGeneratorContext.Provider>
    </Container>
  );
};
