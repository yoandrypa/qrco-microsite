import { ReactNode, useContext, useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Context from "../context/Context";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneIcon from "@mui/icons-material/Done";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";

import * as linkHandler from "../../handlers/links";
import { generateShortLink } from "../../utils";
import * as QrHandler from "../../handlers/qrs";
import {BackgroundType, CornersAndDotsType, DataType, FramesType, OptionsType} from "./types/types";
import {createMainDesign, updateDesign} from "../../handlers/qrDesign";
import {QR_TYPE_ROUTE} from "./constants";
import {areEquals} from "../helpers/generalFunctions";
import initialData, {initialBackground, initialFrame} from "../../helpers/qr/data";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ["QR type", "QR content", "QR design"];

interface QrWizardProps {
  children: ReactNode;
}

interface StepsProps {
  step: number;
  setStep: Function;
  selected: string;
  data: DataType;
  userInfo: object;
  options: OptionsType;
  frame: FramesType;
  background: BackgroundType;
  cornersData: CornersAndDotsType;
  dotsData: CornersAndDotsType;
  setOptions: (opt: OptionsType) => void;
  isWrong: boolean;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const StepperButtons = styled(Button)(() => ({ width: "120px", height: "30px", mt: "-7px" }));

const QrWizard = ({ children }: QrWizardProps) => {
  const [isError, setIsError] = useState<boolean>(false);

  // @ts-ignore
  const { selected, step, setStep, data, setData, userInfo, options, setOptions, frame, background, cornersData,
    dotsData, isWrong, loading, setLoading }: StepsProps = useContext(Context);

  const router = useRouter();

  const handleBack = () => {
    setStep((prev: number) => prev - 1);
  };

  const handleShort = async (target: string) => {
    try {
      return await linkHandler.create({
        body: { target, type: "qr_link" },
        // @ts-ignore
        user: { id: userInfo.attributes.sub }
      });
    } catch (error) {
      return { error };
    }
  };

  const handleNext = async () => {
    // @ts-ignore
    if (step === 0 && Boolean(data.isDynamic) && !Boolean(userInfo)) {
      router.push({ pathname: "/", query: { path: router.pathname, login: true } }, "/");
    } else if (step === 1 && Boolean(userInfo) && ['vcard+', 'web'].includes(selected)) {
      setLoading(true);
      // @ts-ignore
      const model = { ...data, qrType: selected, userId: userInfo.attributes.sub };

      try {
        if (!options.id) {
          const design = await createMainDesign(options);
          // @ts-ignore
          model.qrOptionsId = design;
          // @ts-ignore
          setOptions({...options, id: design.id});
        }

        let qr;
        if (!data.id) {
          // @ts-ignore
          qr = await QrHandler.create(model);
        } else {
          // @ts-ignore
          qr = await QrHandler.edit({...data, id: data.id});
        }

        setData({...data, id: qr.id});

        let shortLink;
        if (data?.isDynamic) {
          // Autogenerate the target url
          const targetUrl = generateShortLink("qr/" + qr.id);
          shortLink = await handleShort(targetUrl);
          // @ts-ignore
          await QrHandler.edit({id: qr.id, userId: userInfo.attributes.sub, shortLinkId: shortLink.id});
        }

        setLoading(false);
        // @ts-ignore
        if (!shortLink?.error) {
          // @ts-ignore
          if (shortLink?.link) { setOptions({ ...options, data: shortLink?.link }); }
          setStep(2);
        }
      } catch {
        setLoading(false);
        setIsError(true);
      }
    } else if (step === 2) {
      if (Boolean(userInfo) && Boolean(options.id)) {
        setLoading(true);

        // @ts-ignore
        let updater = undefined;

        const initializeUpdater = () => {
          // @ts-ignore
          if (!Boolean(updater)) {
            updater = { ...options };
          }
        }

        const areTheSame = () => {
          const cleaner = (obj: OptionsType) => {
            const o = JSON.parse(JSON.stringify(obj));
            // @ts-ignore
            if (o.data !== undefined) { delete o.data; }
            // @ts-ignore
            if (o.qrOptions.typeNumber !== undefined) { delete o.qrOptions.typeNumber; }
            return o;
          }

          return areEquals(cleaner(options), cleaner(initialData));
        }

        if (!areTheSame) {
          initializeUpdater();
        }

        if (!areEquals(frame, initialFrame)) {
          initializeUpdater();
          // @ts-ignore
          updater.frame = frame;
        }
        if (!areEquals(background, initialBackground)) {
          initializeUpdater();
          // @ts-ignore
          updater.background = background;
        }
        if (cornersData !== null) {
          initializeUpdater();
          // @ts-ignore
          updater.corners = cornersData;
        }
        if (dotsData !== null) {
          initializeUpdater();
          // @ts-ignore
          updater.cornersDot = dotsData;
        }

        try {
          // const result = await updateDesign(idDesignRef || '', updater);
          if (updater !== undefined) {
            await updateDesign(options.id || '', updater);
          }
          router.push({pathname: '/', query: { clear: true }}, '/', { shallow: true });
        } catch {
          setIsError(true);
        }
        setLoading(false);
      }
      if (!Boolean(userInfo)) {
        router.push(QR_TYPE_ROUTE, undefined, { shallow: true });
      }
    } else {
      setStep((prev: number) => prev + 1);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "calc(100vh - 220px)" }}>
        {children}
      </Box>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2 }}>
        <StepperButtons
          variant="contained"
          startIcon={<ChevronLeftIcon />}
          disabled={loading || step === 0 || !Boolean(selected)}
          onClick={handleBack}>
          {"Back"}
        </StepperButtons>
        <Stepper activeStep={step} alternativeLabel sx={{ width: "100%" }}>
          {steps.map((label: string) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* @ts-ignore */}
        <StepperButtons
          onClick={handleNext}
          endIcon={step >= 2 ? <DoneIcon /> : <ChevronRightIcon />}
          disabled={
            loading || isWrong || !Boolean(selected) ||
            (step === 1 && Boolean(userInfo) && !Boolean(data?.qrName?.trim().length))
          }
          variant="contained">
          {step >= 2 ? 'Last' : 'Next'}
        </StepperButtons>
      </Box>
      {isError && (
        <Snackbar open autoHideDuration={3500} onClose={() => setIsError(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={() => setIsError(false)} severity="error">
            Error accessing data.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default QrWizard;
