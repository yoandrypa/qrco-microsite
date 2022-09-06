import WebIcon from '@mui/icons-material/Web';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import WifiIcon from '@mui/icons-material/Wifi';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PhotoIcon from '@mui/icons-material/Photo';

import { grey } from "@mui/material/colors";

type RenderIconProp = {
  icon: string;
  enabled: boolean;
};

const RenderIcon = ({ icon, enabled }: RenderIconProp) => {
  const renderIcon = () => {
    switch (icon) {
      case 'email': { return <AlternateEmailIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'facebook': { return <FacebookIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'sms': { return <SmsOutlinedIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'twitter': { return <TwitterIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'vcard': { return <ContactPhoneOutlinedIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'vcard+': { return <ContactPhoneIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'web': { return <WebIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'whatsapp': { return <WhatsAppIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'wifi': { return <WifiIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'pdf': { return <PictureAsPdfIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'mp3': { return <VolumeUpIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'jpg': { return <PhotoIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      default: { return <TextSnippetOutlinedIcon sx={{ color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
    }
  };

  return (<>{renderIcon()}</>);
};

export default RenderIcon;
