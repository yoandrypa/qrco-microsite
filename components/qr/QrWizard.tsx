import { forwardRef, ReactNode, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Context from "../context/Context";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneIcon from "@mui/icons-material/Done";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

import { useRouter } from "next/router";

import { generateId, generateShortLink } from "../../utils";
import * as QrHandler from "../../handlers/qrs";
import { BackgroundType, CornersAndDotsType, DataType, FramesType, OptionsType } from "./types/types";
import { QR_TYPE_ROUTE } from "./constants";
import { areEquals } from "../helpers/generalFunctions";
import { initialBackground, initialFrame } from "../../helpers/qr/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getUuid } from "../../helpers/qr/helpers";

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
  setForceClear: (clear: boolean) => void;
  isWrong: boolean;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const StepperButtons = styled(Button)(() => ({ width: "120px", height: "30px" }));

const QrWizard = ({ children }: QrWizardProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const isWide = useMediaQuery("(min-width:600px)", { noSsr: true });

  // @ts-ignore
  const {
    selected, step, setStep, data, userInfo, options, frame, background, cornersData,
    dotsData, isWrong, loading, setLoading, setForceClear
  }: StepsProps = useContext(Context);

  const router = useRouter();

  const handleBack = () => {
    setStep((prev: number) => prev - 1);
  };

  const handleNext = async () => {
    // @ts-ignore
    if (step === 0 && Boolean(data.isDynamic) && !Boolean(userInfo)) {
      await router.push({ pathname: "/", query: { path: router.pathname, login: true } }, "/");
    } else if (step === 2 && Boolean(userInfo) && ["vcard+", "web", "pdf", "image", "audio", "video"].includes(selected)) {
      setLoading(true);

      const qrDesignId = getUuid();
      const qrId = getUuid();
      const shortLinkId = getUuid();


      const model = {
        ...data,
        qrType: selected,
        // @ts-ignore
        userId: userInfo.attributes.sub,
        id: qrId,
        qrOptionsId: qrDesignId,
        shortLinkId
      };

      const designToStore = { ...options, id: qrDesignId };
      if (!areEquals(frame, initialFrame)) {
        // @ts-ignore
        designToStore.frame = frame;
      }
      if (!areEquals(background, initialBackground)) {
        // @ts-ignore
        designToStore.background = background;
      }
      if (cornersData !== null) {
        // @ts-ignore
        designToStore.corners = cornersData;
      }
      if (dotsData !== null) {
        // @ts-ignore
        designToStore.cornersDot = dotsData;
      }

      const shorLink = {
        id: shortLinkId,
        target: generateShortLink(`qr/${qrId}`),
        address: await generateId(),
        // @ts-ignore
        userId: userInfo.attributes.sub
      };

      await QrHandler.create(shorLink, designToStore, model);

      setForceClear(true);
      // @ts-ignore
      await router.push("/", undefined, {shallow: true});
      setLoading(false);
    } else if (step === 2 && !Boolean(userInfo)) {
      setForceClear(true);
      await router.push(QR_TYPE_ROUTE, undefined, {shallow: true});
    } else {
      setStep((prev: number) => prev + 1);
    }
  };

  const renderBack = () => (
    <StepperButtons
      variant="contained"
      startIcon={<ChevronLeftIcon />}
      disabled={loading || step === 0 || !Boolean(selected)}
      onClick={handleBack}>
      {"Back"}
    </StepperButtons>
  );

  const renderNext = () => (
    <StepperButtons
      onClick={handleNext}
      endIcon={step >= 2 ? <DoneIcon /> : <ChevronRightIcon />}
      disabled={
        loading || isWrong || !Boolean(selected) ||
        (step === 1 && Boolean(userInfo) && !Boolean(data?.qrName?.trim().length))
      }
      variant="contained">
      {step >= 2 ? "Last" : "Next"}
    </StepperButtons>
  );

  const renderSteps = () => (
    <Stepper
      activeStep={step}
      alternativeLabel={!isWide}
      sx={{ width: "100%", mt: { xs: 2, sm: 0 }, mb: { xs: 1, sm: 0 } }}
    >
      {steps.map((label: string) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );

  return (
    <>
      <Box sx={{ minHeight: "calc(100vh - 188px)" }}>
        {children}
      </Box>
      {isWide ? (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2 }}>
          {renderBack()}
          {renderSteps()}
          {renderNext()}
        </Box>
      ) : (
        <>
          {renderSteps()}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {renderBack()}
            {renderNext()}
          </Box>
        </>
      )}
      {isError && (
        <Snackbar open autoHideDuration={3500} onClose={() => setIsError(false)}
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={() => setIsError(false)} severity="error">
            Error accessing data.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default QrWizard;
