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
import { generateId, generateShortLink } from "../../utils";
import * as QrHandler from "../../handlers/qrs";

const steps = ["QR type", "QR content", "QR design"];

interface QrWizardProps {
  children: ReactNode;
}

interface StepsProps {
  step: number;
  setStep: Function;
  selected: string;
  data: object;
  userInfo: object;
  options: object;
  setOptions: Function;
  isWrong: boolean;
}

const StepperButtons = styled(Button)(() => ({ width: "120px", height: "30px", mt: "-7px" }));

const QrWizard = ({ children }: QrWizardProps) => {
  // @ts-ignore
  const {
    selected,
    step,
    setStep,
    data,
    userInfo,
    options,
    setOptions,
    isWrong
  }: StepsProps = useContext(Context);

  // @ts-ignore
  const { loading, setLoading } = useContext(Context);

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
      await router.push({ pathname: "/", query: { path: router.pathname, login: true } }, "/");
    } else if (step === 1 && selected === "vcard+") {
      setLoading(true);
      //Generate an Id (Code) using the short link solution
      const id = await generateId();
      // First create a Record of QR Model
      const qr = await QrHandler.create({
        qrName: selected + " - " + id,
        qrType: selected,
        // @ts-ignore
        userId: userInfo.attributes.sub,
        ...data
      });
      // Autogenerate the target url
      const targetUrl = generateShortLink("qr/" + qr.id);
      const shortLink = await handleShort(targetUrl);
      // @ts-ignore
      await QrHandler.edit({ id: qr.id, userId: userInfo.attributes.sub, shortLink: shortLink.id });
      setLoading(false);
      // @ts-ignore
      if (!shortLink.error) {
        // @ts-ignore
        setOptions({ ...options, data: shortLink?.link });
        setStep(2);
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
          endIcon={step === 2 ? <DoneIcon /> : <ChevronRightIcon />}
          disabled={loading || isWrong || !Boolean(selected)}
          variant="contained">
          {step === 2 ? 'Done' : 'Next'}
        </StepperButtons>
      </Box>
    </>
  );
};

export default QrWizard;
