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
import CardData from './renderers/CardData';
import EmailData, {EmailDataProps} from './renderers/EmailData';
import SMSData, {SMSDataProps} from './renderers/SMSData';
import TwitterData, {TwitterDataProps} from './renderers/TwitterData';
import AssetData , {AssetDataProps} from './renderers/AssetData';
import NotifyDynamic from "./helperComponents/NotifyDynamic";
import BusinessData from "./renderers/BusinessData";

import {CardDataProps, DataType, SocialProps} from './types/types';
import NetworksData from "./renderers/NetworksData.";

type QrContentHandlerProps = {
  data: DataType;
  setData: Function;
  selected?: string | null;
  isWrong: boolean;
  setIsWrong: (isWrong: boolean) => void;
}

const QrContentHandler = () => {
  // @ts-ignore
  const { data, setData, selected, isWrong, setIsWrong }: QrContentHandlerProps = useContext(Context);

  const renderSel = () => {
    if (!selected) {
      return null;
    }
    switch (selected) {
      case 'web': {
        return (<SingleData
          isWrong={isWrong}
          setIsWrong={setIsWrong}
          label="Website"
          msg="Type in the website to link the QR Code."
          // @ts-ignore
          data={data} setData={payload => setData(payload)}
        />);
      }
      case 'text': {
        return (<SingleData
          isWrong={isWrong}
          setIsWrong={setIsWrong}
          label="Message"
          limit={300}
          msg="Type any message up to 300 characters."
          // @ts-ignore
          data={data} setData={payload => setData(payload)}
        />);
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
      case 'vcard+':
      case 'vcard': {
        return <CardData data={data} setData={(payload: CardDataProps) => setData(payload)} />;
      }
      case 'business': {
        return <BusinessData data={data} setData={(payload: CardDataProps) => setData(payload)} />;
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
      case 'image': {
        return <AssetData type={selected} data={data} setData={(payload: AssetDataProps) => setData(payload)} />;
      }
      case 'pdf': {
        return <AssetData type={selected} data={data} setData={(payload: AssetDataProps) => setData(payload)} />;
      }
      case 'audio': {
        return <AssetData type={selected} data={data} setData={(payload: AssetDataProps) => setData(payload)} />;
      }
      case 'video': {
        return <AssetData type={selected} data={data} setData={(payload: AssetDataProps) => setData(payload)} />;
      }
      default: {
        return <NetworksData data={data} setData={(payload: SocialProps) => setData(payload)} />
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'inline' }}>
        <RenderIcon icon={selected || ''} enabled adjust />
      </Box>
      <Typography sx={{ fontWeight: 'bold', display: 'inline', ml: '5px' }}>{selected?.toUpperCase() || ''}</Typography>
      <Typography sx={{ display: 'inline' }}>: Enter the QR data</Typography>
      {data.isDynamic && <NotifyDynamic />}
      <Divider sx={{ my: '10px' }} />
      <Box sx={{ textAlign: 'left', width: '100%' }}>
        {renderSel()}
      </Box>
    </Box>
  );
}

export default QrContentHandler;
