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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TelegramIcon from '@mui/icons-material/Telegram';
import MovieIcon from '@mui/icons-material/Movie';

import { grey } from "@mui/material/colors";

type RenderIconProp = {
  icon: string;
  enabled: boolean;
  adjust?: boolean;
};

export default function RenderIcon({ icon, enabled, adjust }: RenderIconProp) {
  const renderIcon = () => {
    switch (icon) {
      case 'email': { return <AlternateEmailIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'facebook': { return <FacebookIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'sms': { return <SmsOutlinedIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'twitter': { return <TwitterIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'vcard': { return <ContactPhoneOutlinedIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'vcard+': { return <ContactPhoneIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'web': { return <WebIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'whatsapp': { return <WhatsAppIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'pinterest': { return <PinterestIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'linkedin': { return <LinkedInIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'telegram': { return <TelegramIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} /> }
      case 'wifi': { return <WifiIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'pdf': { return <PictureAsPdfIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'audio': { return <VolumeUpIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'video': { return <MovieIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'image': { return <PhotoIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      default: { return <TextSnippetOutlinedIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
    }
  };

  return (<>{renderIcon()}</>);
};
