// @ts-nocheck

// formerly known as QrTemplate
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QrCodeIcon from '@mui/icons-material/QrCode';

import SingleData from './renderers/SingleData';
import WhatsAppData, { WhatsAppProps } from './renderers/WhatsAppData';
import FacebookData, { FacebookDataProps } from './renderers/FacebookData';
import WifiData, { WifiDataProps } from './renderers/WifiData';
import CardData, { CardDataProps } from './renderers/CardData';
import EmailData, { EmailDataProps } from './renderers/EmailData';
import SMSData, { SMSDataProps } from './renderers/SMSData';
import TwitterData, { TwitterDataProps, availableTwittChars } from './renderers/TwitterData';
import TypeSelector from './helperComponents/TypeSelector';
import RenderIcon from './helperComponents/RenderIcon';
import { handleDesignerString } from '../../helpers/qr/helpers';

import QRGeneratorContext from './context/QRGeneratorContext';

interface QrTypeSelectorProps {
  data: object;
  setData: Function;
  setSelected: Function;
  expanded: boolean;
  setExpanded: Function;
  setValue: Function;
  setOpenDesigner: Function;
  selected?: string | null;
  value?: string | null;
};

const QrTypeSelector = () => {
  const { data, expanded, setData, setExpanded, setSelected, setValue, selected, value, setOpenDesigner }: QrTypeSelectorProps = useContext(QRGeneratorContext);

  const handleChange = (): void => {
    if (selected) {
      setExpanded((prev: boolean) => !prev);
    }
  };

  const handleSelect = (payload: string): void => {
    setSelected((prev: string) => prev === payload ? null : payload);
  };

  const handleOpenDesigner = (): void => {
    setOpenDesigner(handleDesignerString(selected, data, value));
  };

  const renderSel = useCallback(() => {
    if (!selected) {
      return null;
    }
    switch (selected) {
      case 'web': {
        return (<SingleData
          label="Website"
          msg="Type in the website to link the QR Code."
          data={value || ''}
          setData={payload => setValue(payload)} />);
      }
      case 'text': {
        return (<SingleData
          label="Message"
          limit={300}
          msg="Type any message up to 300 characters."
          data={value || ''}
          setData={payload => setValue(payload.slice(0, 300))} />);
      }
      case 'whatsapp': {
        return <WhatsAppData data={data} setData={(payload: WhatsAppProps) => setData(payload)} />;
      }
      case 'facebook': {
        return <FacebookData data={data} setData={(payload: FacebookDataProps) => setData(payload)} />;
      }
      case 'wifi': {
        return <WifiData data={data} setData={(payload: WifiDataProps) => setData(payload)} />;
      }
      case 'vcard': {
        return <CardData data={data} setData={(payload: CardDataProps) => setData(payload)} />;
      }
      case 'email': {
        return <EmailData data={data} setData={(payload: EmailDataProps) => setData(payload)} />;
      }
      case 'sms': {
        return <SMSData data={data} setData={(payload: SMSDataProps) => setData(payload)} />;
      }
      case 'twitter': {
        return <TwitterData data={data} setData={(payload: TwitterDataProps) => setData(payload)} />;
      }
    }
  }, [selected, value, data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={selected ? <ExpandMoreIcon /> : null} aria-controls="panel1bh-content" id="panel1bh-header">
          <Box sx={{ display: 'flex' }}>
            <QrCodeIcon sx={{ fontSize: '53px', mt: '2px', color: theme => theme.palette.primary.dark }} />
            <Box sx={{ textAlign: 'left', display: 'block' }}>
              <Typography variant="h6">QR type</Typography>
              <Typography>Kind of QR Code to generate</Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="web" label="Website" description="Link to any page on the web" selected={selected === 'web'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="email" label="Email" description="Receive email messages" selected={selected === 'email'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="sms" label="SMS" description="Receive text messages" selected={selected === 'sms'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="vcard" label="VCard" description="Share your contact details" selected={selected === 'vcard'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="text" label="Text" description="Display a short text message" selected={selected === 'text'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="wifi" label="WiFi" description="Get connected to a WiFi network" selected={selected === 'wifi'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="twitter" label="Twitter" description="Post a tweet" selected={selected === 'twitter'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="whatsapp" label="Whatsapp" description="Send a Whatsapp message" selected={selected === 'whatsapp'} handleSelect={handleSelect} />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TypeSelector icon="facebook" label="Facebook" description="Share an URL in your wall" selected={selected === 'facebook'} handleSelect={handleSelect} />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {selected && (
        <Accordion expanded={!expanded} onChange={handleChange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <RenderIcon icon={selected} />
            <Typography sx={{ fontWeight: 'bold', display: 'inline', ml: '5px' }}>{selected.toUpperCase()}</Typography>
            <Typography sx={{ display: 'inline' }}>: Enter the QR data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{ mt: '-14px', mb: '10px' }} />
            <Box sx={{ textAlign: 'left', width: '100%' }}>
              {renderSel()}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      <Fab
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={handleOpenDesigner}
        variant="extended"
        color="primary"
        size="small"
        disabled={
          !value?.trim().length || (selected === 'facebook' && !data?.message?.trim().length) ||
          (selected === 'wifi' && !data?.name?.trim().length) || (selected === 'whatsapp' && !data?.number?.length) ||
          (selected === 'twitter' && (!data?.text?.length || availableTwittChars(data) < 0))
        }>
        <ArrowForwardIcon sx={{ mr: { sm: 1, xs: 0 } }} />
        <Typography sx={{ display: { sm: 'block', xs: 'none' } }}>QR Editor</Typography>
      </Fab>
    </>
  );
}

export default QrTypeSelector;
