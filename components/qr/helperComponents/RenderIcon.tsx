import WebIcon from '@mui/icons-material/Web';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import WifiIcon from '@mui/icons-material/Wifi';
import TwitterIcon from '@mui/icons-material/Twitter';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

type RenderIconProp = { icon: string; };

const RenderIcon = ({ icon }: RenderIconProp) => {
  const renderIcon = () => {
    switch (icon) {
      case 'email': { return <AlternateEmailIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
      case 'facebook': { return <FacebookIcon sx={{ color: theme => theme.palette.primary.dark }} /> }
      case 'sms': { return <SmsOutlinedIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
      case 'twitter': { return <TwitterIcon sx={{ color: theme => theme.palette.primary.dark }} /> }
      case 'vcard': { return <ContactPhoneOutlinedIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
      case 'web': { return <WebIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
      case 'whatsapp': { return <WhatsAppIcon sx={{ color: theme => theme.palette.primary.dark }} /> }
      case 'wifi': { return <WifiIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
      default: { return <TextSnippetOutlinedIcon sx={{ color: theme => theme.palette.primary.dark }} />; }
    }
  };

  return (<>{renderIcon()}</>);
};

export default RenderIcon;