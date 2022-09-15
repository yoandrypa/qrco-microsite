import { ReactNode, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Amplify, Auth } from "aws-amplify";

import Context from "./Context";
import initialData, { initialBackground, initialFrame } from "../../helpers/qr/data";
import {BackgroundType, CornersAndDotsType, DataType, FramesType, OptionsType} from "../qr/types/types";
import {PARAM_QR_TEXT, QR_CONTENT_ROUTE, QR_DESIGNER_NEW_ROUTE, QR_TYPE_ROUTE} from "../qr/constants";
import AppWrapper from "../AppWrapper";
import awsExports from "../../libs/aws/aws-exports";
import PleaseWait from "../PleaseWait";
import Generator from "../qr/Generator";

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

  const [options, setOptions] = useState<OptionsType>(handleInitialData('Ebanux'));
  const [cornersData, setCornersData] = useState<CornersAndDotsType>(null);
  const [dotsData, setDotsData] = useState<CornersAndDotsType>(null);
  const [logoData, setLogoData] = useState(null);
  const [background, setBackground] = useState<BackgroundType>(initialBackground);
  const [frame, setFrame] = useState<FramesType>(initialFrame);
  const [data, setData] = useState<DataType>({});

  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);
  const [forceClear, setForceClear] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState(null);
  const [verifying, setVerifying] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const doneInitialRender = useRef<boolean>(false);

  const router = useRouter();

  const logout = async () => {
    try {
      await Auth.signOut();
      setUserInfo(null);
      router.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const clearData = () => {
    setStep(0);
    setSelected(null);
    setLogoData(null);
    setBackground(initialBackground);
    setFrame(initialFrame);
    setDotsData(null);
    setCornersData(null);
    setOptions(handleInitialData('Ebanux'));
    setData({});
    setIsWrong(false);
    setLoading(false);

    setForceClear(false);
  };

  useEffect(() => {
    if (router.pathname === QR_TYPE_ROUTE) {
      if (doneInitialRender.current) {
        if (Boolean(selected)) {
          if (selected === "web") {
            setData({ ...data, value: "https://www.example.com" });
          } else if (selected === "facebook") {
            setData({ ...data, message: "https://www.example.com" });
          } else if (selected === "text") {
            setData({ ...data, value: "Enter any text here" });
          }
        } else {
          clearData();
        }
        if (step !== 0) {
          setStep(0);
        }
        if (isWrong) {
          setIsWrong(false);
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
    if (doneInitialRender.current && !Boolean(router.query.clear)) {
      switch (step) {
        case 0: {
          router.push(QR_TYPE_ROUTE, undefined, {shallow: true});
          break;
        }
        case 1: {
          router.push(QR_CONTENT_ROUTE, undefined, {shallow: true});
          break;
        }
        case 2: {
          router.push(QR_DESIGNER_NEW_ROUTE, undefined, {shallow: true});
          break;
        }
      }
    } else {
      doneInitialRender.current = true;
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ([QR_CONTENT_ROUTE, QR_DESIGNER_NEW_ROUTE].includes(router.pathname)) {
      if (Boolean(data?.isDynamic) && !Boolean(userInfo) && !Boolean(router.query.login)) {
        router.push({ pathname: '/', query: { path: router.pathname, login: true }}, '/');
      } else if (!Boolean(selected)) {
        router.push(QR_TYPE_ROUTE, undefined, {shallow: true});
      }
    }
    if (router.pathname === '/') {
      if (!Boolean(router.query.login) && step !== 0) {
        setStep(0);
      }
    }
  }, [router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Boolean(userInfo) && verifying) {
      setVerifying(false);
    }
  }, [userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (forceClear) {
      clearData();
    }
  }, [forceClear]);

  const verify = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUserInfo(userData);
    } catch {
      setUserInfo(null);
      setVerifying(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  if (router.pathname.startsWith("/qr") && !["/qr/type", "/qr/content", "/qr/new"].includes(router.pathname)) {
    return (<>{children}</>);
  }

  if (verifying) {
    return (<PleaseWait />);
  }

  const renderContent = () => {
    if (router.pathname === '/' && router.query[PARAM_QR_TEXT] !== undefined) {
      const qrText = router.query[PARAM_QR_TEXT] as string;
      if (qrText !== undefined && qrText.length) {
        return (
          <AppWrapper>
            <Generator forceOverride={qrText} />
          </AppWrapper>
        );
      }
    } else {
      return (
        <AppWrapper userInfo={userInfo} handleLogout={logout} clearData={clearData}>
          {children}
        </AppWrapper>
      );
    }
  }

  return (
    <Context.Provider value={{
      cornersData, setCornersData,
      dotsData, setDotsData,
      logoData, setLogoData,
      frame, setFrame,
      background, setBackground,
      options, setOptions,
      selected, setSelected,
      data, setData,
      userInfo, setUserInfo,
      step, setStep, setForceClear,
      loading, setLoading,
      isWrong, setIsWrong
    }}>
      {renderContent()}
    </Context.Provider>
  );
};

export default AppContextProvider;
