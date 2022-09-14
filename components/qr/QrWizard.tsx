import { ReactNode, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Context from "../context/Context";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneIcon from "@mui/icons-material/Done";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";

import * as linkHandler from "../../handlers/links";
import { generateShortLink } from "../../utils";
import * as QrHandler from "../../handlers/qrs";
import {BackgroundType, CornersAndDotsType, DataType, FramesType, OptionsType, UpdaterType} from "./types/types";
import {createMainDesign, updateDesign} from "../../handlers/qrDesign";
import {QR_TYPE_ROUTE} from "./constants";

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
  clearData: () => void;
  isWrong: boolean;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  idDesignRef: string | null;
  setIdDesignRef: (id: null | string) => void;
}

const StepperButtons = styled(Button)(() => ({ width: "120px", height: "30px", mt: "-7px" }));

const QrWizard = ({ children }: QrWizardProps) => {
  // @ts-ignore
  const { selected, step, setStep, data, userInfo, options, setOptions, frame, background, cornersData, dotsData,
    isWrong, loading, setLoading, idDesignRef, setIdDesignRef, clearData }: StepsProps = useContext(Context);

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
      // First create a Record of QR Model
      // @ts-ignore
      const design = await createMainDesign(options);
      // @ts-ignore
      setIdDesignRef(design.id);

      // @ts-ignore
      const model = { ...data, qrType: selected, userId: userInfo.attributes.sub, qrOptionsId: design };

      // @ts-ignore
      const qr = await QrHandler.create(model);

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
        setOptions({ ...options, data: shortLink?.link });
        setStep(2);
      }
    } else if (step === 2) {
      if (Boolean(userInfo) && Boolean(idDesignRef)) {
        const updater = {options, frame, background} as UpdaterType;
        if (cornersData !== null) {
          updater.corners = cornersData;
        }
        if (dotsData !== null) {
          updater.cornersDot = dotsData;
        }

        try {
          setLoading(true);
          // const result = await updateDesign(idDesignRef || '', updater);
          await updateDesign(idDesignRef || '', updater);
          router.push({pathname: '/', query: { clear: true }}, '/', { shallow: true });
        } catch (error) {
          console.log(error);

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
    </>
  );
};

export default QrWizard;
