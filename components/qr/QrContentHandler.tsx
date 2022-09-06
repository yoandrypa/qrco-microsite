import {useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import RenderIcon from './helperComponents/RenderIcon';

import Context from '../context/Context';
import SingleData from './renderers/SingleData';
import WhatsAppData, {WhatsAppProps} from './renderers/WhatsAppData';
import FacebookData, {FacebookDataProps} from './renderers/FacebookData';
import WifiData, {WifiDataProps} from './renderers/WifiData';
import CardData, {CardDataProps} from './renderers/CardData';
import EmailData, {EmailDataProps} from './renderers/EmailData';
import SMSData, {SMSDataProps} from './renderers/SMSData';
import TwitterData, {TwitterDataProps} from './renderers/TwitterData';
import {DataType} from './types/types';

type QrContentHandlerProps = {
  data: DataType;
  setData: Function;
  setValue: Function;
  selected?: string | null;
  value?: string | null;
}

const QrContentHandler = () => {
  // @ts-ignore
  const { data, setData, setValue, selected, value }: QrContentHandlerProps = useContext(Context);

  const renderSel = () => {
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
        // @ts-ignore
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
  };

  return (
    <Box>
      <RenderIcon icon={selected || ''} enabled />
      <Typography sx={{ fontWeight: 'bold', display: 'inline', ml: '5px' }}>{selected?.toUpperCase() || ''}</Typography>
      <Typography sx={{ display: 'inline' }}>: Enter the QR data</Typography>
      <Divider sx={{ mt: '-14px', mb: '10px' }} />
      <Box sx={{ textAlign: 'left', width: '100%' }}>
        {renderSel()}
      </Box>
    </Box>
  );
}

export default QrContentHandler;
