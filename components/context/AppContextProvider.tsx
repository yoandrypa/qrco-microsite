import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/router";

import { Amplify, Auth } from "aws-amplify";

import Context from "./Context";
import initialOptions, {initialData, initialBackground, initialFrame} from "../../helpers/qr/data";
import { BackgroundType, CornersAndDotsType, DataType, FramesType, OptionsType } from "../qr/types/types";
import { PARAM_QR_TEXT, QR_CONTENT_ROUTE, QR_DESIGN_ROUTE, QR_TYPE_ROUTE } from "../qr/constants";
import AppWrapper from "../AppWrapper";
import awsExports from "../../libs/aws/aws-exports";
import PleaseWait from "../PleaseWait";
import Generator from "../qr/Generator";
import Loading from "../Loading";
import QrGen from "../../pages/qr/type";
import {dataCleaner, getBackgroundObject, getCornersAndDotsObject, getFrameObject} from "../../helpers/qr/helpers";

Amplify.configure(awsExports);

interface ContextProps {
  children: ReactNode;
}

const handleInitialData = (value: string | null | undefined) => {
  if (!value) {
    return JSON.parse(JSON.stringify(initialOptions));
  }
  const opts = JSON.parse(JSON.stringify(initialOptions));
  opts.data = value;
  return opts;
};

const AppContextProvider = (props: ContextProps) => {
  const { children } = props;

  const [options, setOptions] = useState<OptionsType>(handleInitialData("Ebanux"));
  const [cornersData, setCornersData] = useState<CornersAndDotsType>(null);
  const [dotsData, setDotsData] = useState<CornersAndDotsType>(null);
  const [background, setBackground] = useState<BackgroundType>(initialBackground);
  const [frame, setFrame] = useState<FramesType>(initialFrame);
  const [data, setData] = useState<DataType>(initialData);

  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);
  const [forceClear, setForceClear] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState(null);
  const [verifying, setVerifying] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);

  const doneInitialRender = useRef<boolean>(false);
  const doNotNavigate = useRef<boolean>(false);

  const router = useRouter();

  const isUserInfo = useMemo(() => userInfo !== null, [userInfo]);

  const clearData = useCallback((keepType?: boolean) => {
    setForceClear(false);

    setIsWrong(false);
    setLoading(false);
    setStep(0);
    setSelected(null);
    setBackground(initialBackground);
    setFrame(initialFrame);
    setDotsData(null);
    setCornersData(null);
    setOptions(handleInitialData("Ebanux"));

    if (!keepType || data.isDynamic) {
      setData(initialData);
    } else {
      setData({});
    }
  }, [data.isDynamic]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current && router.pathname === QR_TYPE_ROUTE) {
      if (selected !== null) {
        if (selected === "web") {
          setData({ ...data, value: "https://www.example.com" });
        } else if (selected === "facebook") {
          setData({ ...data, message: "https://www.example.com" });
        } else if (selected === "text") {
          setData({ ...data, value: "Enter any text here" });
        }
      } else {
        clearData(true);
      }
      if (step !== 0) {
        setStep(0);
      }
      if (isWrong) {
        setIsWrong(false);
      }
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current) {
      setSelected(null);
    }
  }, [data?.isDynamic]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doneInitialRender.current && !doNotNavigate.current) {
      let pathLocation = QR_TYPE_ROUTE;
      if (step === 1) {
        pathLocation = QR_CONTENT_ROUTE;
      } else if (step === 2) {
        pathLocation = QR_DESIGN_ROUTE;
      }
      router.push(pathLocation, undefined, {shallow: true})
        .then(() => { setLoading(false); });
    } else {
      doneInitialRender.current = true;
      doNotNavigate.current = false;
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (options?.mode !== 'edit') {
      if ([QR_CONTENT_ROUTE, QR_DESIGN_ROUTE].includes(router.pathname)) {
        if (data?.isDynamic && !isUserInfo && !router.query.login) {
          router.push({pathname: "/", query: {path: router.pathname, login: true}}, "/").then(() => { setLoading(false); });
        } else if (selected === null) {
          router.push(QR_TYPE_ROUTE, undefined, {shallow: true}).then(() => { setLoading(false); });
        }
      }
      if (router.pathname === "/") {
        if (step === 2) {
          if (isUserInfo) {
            doNotNavigate.current = true;
          }
          clearData();
        }

        if (!router.query.login && step !== 0) {
          setStep(0);
        }
      }
    }

    if (loading) {
      setLoading(false);
    }
  }, [router.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isUserInfo && verifying) {
      setVerifying(false);
    }
  }, [isUserInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (forceClear) {
      doNotNavigate.current = true;
      clearData();
    }
  }, [forceClear]); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (options.mode === "edit") {
      // doNotNavigate.current = true;

      setCornersData(getCornersAndDotsObject(options, 'corners'));
      setDotsData(getCornersAndDotsObject(options, 'cornersDot'));
      setBackground(getBackgroundObject(options) || initialBackground);
      setFrame(getFrameObject(options) || initialFrame);
      setData(dataCleaner(options));
      // @ts-ignore
      setSelected(options.qrType);

      if (options?.isDynamic) {
        router.push(QR_CONTENT_ROUTE).then(() => {
          setStep(1);
          setLoading(false);
        });
      } else {
        router.push(QR_DESIGN_ROUTE).then(() => {
          setStep(2);
          setLoading(false);
        });
      }
    }
   }, [options.mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await Auth.signOut();
      setUserInfo(null);
      clearData(); // includes setLoading as false
      return <QrGen />;
    } catch (error) {
      setLoading(false);
      console.log("error signing out: ", error);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (router.pathname.startsWith("/qr") && ![QR_TYPE_ROUTE, QR_CONTENT_ROUTE, QR_DESIGN_ROUTE].includes(router.pathname)) {
    return (<>{children}</>);
  }

  if (verifying) {
    return (<PleaseWait />);
  }

  const renderContent = () => {
    if (router.pathname === "/" && router.query[PARAM_QR_TEXT] !== undefined) {
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
        <AppWrapper userInfo={userInfo} handleLogout={logout} clearData={clearData} setLoading={setLoading}>
          {children}
        </AppWrapper>
      );
    }
  };

  return (<>
      {loading && <Loading />}
      <Context.Provider value={{
        cornersData, setCornersData,
        dotsData, setDotsData,
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
    </>
  );
};

export default AppContextProvider;
