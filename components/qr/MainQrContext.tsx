import { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useRouter } from 'next/router';

import QRGeneratorContext from './context/QRGeneratorContext';

import initialData, { initialBackground, initialFrame } from '../../helpers/qr/data';
import { OptionsType } from './types/types';

interface MainQrContextProps {
  children: ReactNode;
};

const handleInitialData = (value: string | null | undefined) => {
  if (!value) {
    return JSON.parse(JSON.stringify(initialData));
  }
  const opts = JSON.parse(JSON.stringify(initialData));
  opts.data = value;
  return opts;
};

const MainQrContext = ({ children }: MainQrContextProps) => {
  const context = useContext(QRGeneratorContext);

  const [value, setValue] = useState<string>('Ebanux');
  const [options, setOptions] = useState<OptionsType>(handleInitialData(value));
  const [cornersData, setCornersData] = useState(null);
  const [dotsData, setDotsData] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [background, setBackground] = useState(initialBackground);
  const [frame, setFrame] = useState(initialFrame);
  const [data, setData] = useState({});

  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const doneInitialRender = useRef<boolean>(false);
  const forceOpenDesigner = useRef<boolean>(false);

  const router = useRouter();

  const navigateForward = useCallback((): void => {
    router.push('/qr/new');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenDesigner = (payload: string | null): void => {
    if (payload !== value) {
      forceOpenDesigner.current = true;
      // @ts-ignore
      setOptions({ ...options, data: !selected ? value : payload });
    } else {
      navigateForward
    }
  };

  const goBack = (): void => {
    router.push('/qr');
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
      navigateForward();
    }
  }, [options]); // eslint-disable-line react-hooks/exhaustive-deps

  const render = () => {
    return (
      <Container>
        <Box sx={{ p: 1, width: { sm: '780px', xs: 'calc(100% - 20px)' }, mx: 'auto' }}>
          <h1>QR Generator</h1>
          {children}
        </Box>
      </Container>
    );
  };

  if (context && Object.keys(context).length) {
    return render();
  }

  return (
    <QRGeneratorContext.Provider value={{
      cornersData, setCornersData, dotsData, setDotsData, logoData, setLogoData, frame, setFrame, background, setBackground, options, 
      setOptions, selected, setSelected, expanded, setExpanded, setOpenDesigner: handleOpenDesigner, goBack, value, setValue
    }}>
      {render()}
    </QRGeneratorContext.Provider>
  );
}

export default MainQrContext;
