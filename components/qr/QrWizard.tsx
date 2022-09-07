import { ReactNode, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Context from "../context/Context";
import { styled } from "@mui/material/styles";
import * as linkHandler from "../../handlers/links";
import { generateId, generateShortLink } from "../../utils";
import { QrVCardPlus } from "../../models/qr/QrVCardPlus";

const steps = ["Type of QR", "QR content", "QR design"];

interface QrWizardProps {
  children: ReactNode;
}

interface StepsProps {
  step: number;
  setStep: Function;
}

const StepperButtons = styled(Button)(() => ({ width: "80px", height: "30px", mt: "-5px" }));

const QrWizard = ({ children }: QrWizardProps) => {
  // @ts-ignore
  const { selected, step, setStep, data, userInfo, setOptions, options }: StepsProps = useContext(Context);

  const [loading, setLoading] = useState<boolean>(false);

  const handleBack = () => {
    setStep((prev: number) => prev - 1);
  };

  const handleShort = async (target: string) => {
    try {
      return await linkHandler.create({
        body: { target },
        user: { id: userInfo.attributes.sub }
      });
    } catch (error) {
      return { error };
    }
  };

  const handleNext = async () => {
    if (step === 1 && selected === "vcard+" && data?.isDynamic) {
      setLoading(true);
      //Generate an Id (Code) using the short link solution
      const id = await generateId();
      // First create a Record of QR Model
      const qr = await QrVCardPlus.create({
        id,
        ...data
      });
      // Autogenerate the target url
      const targetUrl = generateShortLink("qr/" + id);
      const value = await handleShort(targetUrl);
      setLoading(false);
      // @ts-ignore
      if (!value.error) {
        // @ts-ignore
        setOptions({...options, data: value?.link})
        setStep(2);
      }
    } else {
      setStep((prev: number) => prev + 1);
    }
  };

  return (
    <>
      {loading && (
        <Box sx={{ position: "fixed", top: "10px", left: "10px" }}>
          Fetching data. Please wait...
        </Box>
      )}
      <Box sx={{ minHeight: "calc(100vh - 220px)" }}>
        {children}
      </Box>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", pt: 2 }}>
        <StepperButtons variant="contained" disabled={loading || step === 0 || !Boolean(selected)} onClick={handleBack}>
          Back
        </StepperButtons>
        <Stepper activeStep={step} alternativeLabel sx={{ width: "100%" }}>
          {steps.map((label: string, index: number) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* @ts-ignore */}
        <StepperButtons onClick={handleNext} disabled={loading || step === 2 || !Boolean(selected)} variant="contained">
          Next
        </StepperButtons>
      </Box>
    </>
  );
};

export default QrWizard;
