import {ReactNode, useContext} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Context from "../context/Context";
import {styled} from "@mui/material/styles";

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
  const { selected, step, setStep }: StepsProps = useContext(Context);

  const handleBack = () => {
    setStep((prev: number) => prev - 1);
  };

  const handleNext = () => {
    setStep((prev: number) => prev + 1);
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
