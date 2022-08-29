// @ts-nocheck

import { useEffect, useRef, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import QRGeneratorContext from '../../components/qr/context/QRGeneratorContext';
import QrTypeSelector from '../../components/qr/QrTypeSelector';
import initialData, { initialBackground, initialFrame } from '../../helpers/qr/data';
import { OptionsType } from '../../components/qr/types/types';
import Generator from "../../components/qr/Generator";

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
  const [selected, setSelected] = useState<string | null>(null);
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

  const goBack = () => {
    setTabtabSelected(0);
  };

  useEffect(() => {
    if (doneInitialRender.current) {
      if (selected) {
        if (selected === 'web') {
          setValue('https://www.example.com');
        } else if (selected === 'facebook') {
          setData({ ...data, message: 'https://www.example.com' });
        } else {
          setValue('Enter any text here');
        }
      } else {
        setValue('Ebanux');
        setData({});
        setLogoData(null);
        setBackground(initialBackground);
        setFrame(initialFrame);
      }
    }
    setExpanded(!Boolean(selected));
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current) {
      setOptions({ ...options, data: value });
    } else {
      doneInitialRender.current = true;
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (forceOpenDesigner.current) {
      forceOpenDesigner.current = false;
      setTabtabSelected(1);
    }
  }, [options]);

  useEffect(() => {
    forceOpenDesigner.current = false;
  }, [tabSelected]);

  return (
    <Container>
      <QRGeneratorContext.Provider value={{ cornersData, setCornersData, dotsData, setDotsData }}>
        <Box sx={{ p: 1, width: { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto' }}>
          <h1>QR Generator</h1>
          {tabSelected === 0 ? (
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
          ) : (
            <Generator
              options={options}
              setOptions={setOptions}
              logoData={logoData}
              setLogoData={setLogoData}
              background={background}
              setBackground={setBackground}
              frame={frame}
              goBack={goBack}
              setFrame={setFrame}
            />
          )}
        </Box>
      </QRGeneratorContext.Provider>
    </Container>
  );
};
