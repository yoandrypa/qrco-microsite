import { ReactNode, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { Auth } from 'aws-amplify';

import Context from './Context';
import initialData, { initialBackground, initialFrame } from '../../helpers/qr/data';
import { DataType, OptionsType } from '../qr/types/types';
import { QR_DESIGNER_NEW_ROUTE, QR_TYPE_ROUTE } from '../qr/constants';

interface ContextProps {
  children: ReactNode;
}

const handleInitialData = (value: string | null | undefined) => {
  if (!value) {
    return JSON.parse(JSON.stringify(initialData));
  }
  const opts = JSON.parse(JSON.stringify(initialData));
  opts.data = value;
  return opts;
};

const AppContextProvider = (props: ContextProps) => {
  const { children } = props;

  const [value, setValue] = useState<string>('Ebanux');
  const [options, setOptions] = useState<OptionsType>(handleInitialData(value));
  const [cornersData, setCornersData] = useState(null);
  const [dotsData, setDotsData] = useState(null);
  const [logoData, setLogoData] = useState(null);
  const [background, setBackground] = useState(initialBackground);
  const [frame, setFrame] = useState(initialFrame);
  const [data, setData] = useState<DataType>({});

  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const [userInfo, setUserInfo] = useState(null);

  const doneInitialRender = useRef<boolean>(false);
  const forceOpenDesigner = useRef<boolean>(false);

  const router = useRouter();

  const navigateForward = (): void => {
    router.push(QR_DESIGNER_NEW_ROUTE, undefined, { shallow: true });
  };

  const handleOpenDesigner = (payload: string | null): void => {
    if (payload !== value) {
      forceOpenDesigner.current = true;
      // @ts-ignore
      const newData = (!Boolean(selected) ? value : payload) as string;
      const opts = JSON.parse(JSON.stringify(options));
      opts.data = newData;
      setOptions(opts);
    } else {
      navigateForward();
    }
  };

  const goBack = (): void => {
    router.push(QR_TYPE_ROUTE, undefined, { shallow: true });
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setUserInfo(null);
      router.push('/');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  useEffect(() => {
    if (router.pathname === QR_TYPE_ROUTE) {
      if (doneInitialRender.current) {
        if (Boolean(selected)) {
          if (selected === 'web') {
            setValue('https://www.example.com');
          } else if (selected === 'facebook') {
            setData({ ...data, message: 'https://www.example.com' });
          } else if (selected === 'text') {
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
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current) {
      const opts = JSON.parse(JSON.stringify(options));
      opts.data = value;
      setOptions(opts);
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

  return (
    <Context.Provider value={{
      cornersData, setCornersData, dotsData, setDotsData, logoData, setLogoData, frame, setFrame, background, setBackground,
      options, setOptions, selected, setSelected, expanded, setExpanded, setOpenDesigner: handleOpenDesigner, goBack,
      value, setValue, data, setData, userInfo, setUserInfo, logout
    }}>
      {children}
    </Context.Provider>
  );
}

export default AppContextProvider;
