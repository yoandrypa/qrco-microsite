import { ReactNode, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {Amplify, Auth} from 'aws-amplify';

import Context from './Context';
import initialData, { initialBackground, initialFrame } from '../../helpers/qr/data';
import { DataType, OptionsType } from '../qr/types/types';
import {QR_CONTENT_ROUTE, QR_DESIGNER_NEW_ROUTE, QR_TYPE_ROUTE} from '../qr/constants';
import AppWrapper from '../AppWrapper';
import awsExports from '../../libs/aws/aws-exports';
import PleaseWait from "../PleaseWait";

Amplify.configure(awsExports);

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
  const [step, setStep] = useState<number>(0);

  const [userInfo, setUserInfo] = useState(null);
  const [verifying, setVerifying] = useState<boolean>(true);

  const doneInitialRender = useRef<boolean>(false);
  const forceOpenDesigner = useRef<boolean>(false);

  const router = useRouter();

  const handleOpenDesigner = (payload: string | null): void => {
    if (payload !== value) {
      forceOpenDesigner.current = true;
      // @ts-ignore
      const newData = (!Boolean(selected) ? value : payload) as string;
      const opts = JSON.parse(JSON.stringify(options));
      opts.data = newData;
      setOptions(opts);
    }
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
          // setData({});
          setLogoData(null);
          setBackground(initialBackground);
          setFrame(initialFrame);
        }
        if (Object.keys(data).length) {
          const { isDynamic } = data;
          const newData = {};
          if (isDynamic !== undefined) {
            // @ts-ignore
            newData.isDynamic = isDynamic;
          }
          setData(newData);
        }
      }
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current) {
      setSelected(null);
    }
  }, [data?.isDynamic]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current) {
      switch (step) {
        case 0: {
          router.push(QR_TYPE_ROUTE, undefined, { shallow: true });
          break;
        }
        case 1: {
          router.push(QR_CONTENT_ROUTE, undefined, { shallow: true });
          break;
        }
        default: {
          router.push(QR_DESIGNER_NEW_ROUTE, undefined, { shallow: true });
          break;
        }
      }
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current && [QR_CONTENT_ROUTE,QR_DESIGNER_NEW_ROUTE].includes(router.pathname) && !Boolean(selected)) {
      router.push(QR_TYPE_ROUTE, undefined, { shallow: true });
    }
  }, [router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
    }
  }, [options]); // eslint-disable-line react-hooks/exhaustive-deps

  const verify = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUserInfo(userData);
    } catch {
      setUserInfo(null);
      setVerifying(false);
    }
  }

  useEffect(() => {
    if (Boolean(userInfo) && verifying) {
      setVerifying(false);
    }
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    verify();
  }, []);

  if (router.pathname.startsWith('/qr') && !['/qr/type', '/qr/content', '/qr/new'].includes(router.pathname)) {
    return (<>{children}</>);
  }

  if (verifying) {
    return (<PleaseWait />);
  }

  return (
    <Context.Provider value={{
      cornersData, setCornersData, dotsData, setDotsData, logoData, setLogoData, frame, setFrame, background, setBackground,
      options, setOptions, selected, setSelected, setOpenDesigner: handleOpenDesigner, value, setValue, data, setData,
      userInfo, setUserInfo, step, setStep
    }}>
      <AppWrapper userInfo={userInfo} handleLogout={logout}>
        {children}
      </AppWrapper>
    </Context.Provider>
  );
}

export default AppContextProvider;
