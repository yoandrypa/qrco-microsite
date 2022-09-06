import {ReactNode, useContext} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Context from "../context/Context";
import {styled} from "@mui/material/styles";
import * as linkHandler from "../../handlers/links";
import {QR_CONTENT_ROUTE} from "./constants";

const steps = ['Type of QR', 'QR content', 'QR design'];

interface QrWizardProps {
  children: ReactNode;
}

interface StepsProps {
  step: number;
  setStep: Function;
}

const StepperButtons = styled(Button)(() => ({ width: '80px', height: '30px', mt: '-5px' }));

const QrWizard = ({children}: QrWizardProps) => {
  // @ts-ignore
  const { selected, step, setStep, data, userInfo }: StepsProps = useContext(Context);

  const handleBack = () => {
    setStep((prev: number) => prev - 1);
  };

  const handleShort = async () => {
    try {
      return await linkHandler.create({
        body: { target: "https://wwww.ebanux.com", reuse: false  },
        user: {id: userInfo.attributes.sub}
      });
    } catch (error) {
      return {error}
    }
  }

  const handleNext = async () => {
    if (step === 1 && selected === 'vcard+' && data?.isDynamic) {
      const value = await handleShort();
    } else {
      setStep((prev: number) => prev + 1);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: 'calc(100vh - 220px)' }}>
        {children}
      </Box>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
        <StepperButtons variant="contained" disabled={step === 0 || !Boolean(selected)} onClick={handleBack}>
          Back
        </StepperButtons>
        <Stepper activeStep={step} alternativeLabel sx={{ width: '100%' }}>
          {steps.map((label: string, index: number) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* @ts-ignore */}
        <StepperButtons onClick={handleNext} disabled={step === 2 || !Boolean(selected)} variant="contained">
          Next
        </StepperButtons>
      </Box>
    </>
  )
}

export default QrWizard;
