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
import InstagramIcon from '@mui/icons-material/Instagram';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import PhotoIcon from '@mui/icons-material/Photo';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';
import BusinessIcon from '@mui/icons-material/Business';
import MovieIcon from '@mui/icons-material/Movie';
import ChairIcon from '@mui/icons-material/Chair';
import AccessibleIcon from '@mui/icons-material/Accessible';
import WcIcon from '@mui/icons-material/Wc';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ParkIcon from '@mui/icons-material/Park';
import TrainIcon from '@mui/icons-material/Train';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import HotelIcon from '@mui/icons-material/Hotel';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SchoolIcon from '@mui/icons-material/School';

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
      case 'whatsapp': { return <WhatsAppIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'pinterest': { return <PinterestIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'linkedin': { return <LinkedInIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'telegram': { return <TelegramIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'instagram': { return <InstagramIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'youtube': { return <YouTubeIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'wifi': { return <WifiIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'pdf': { return <PictureAsPdfIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'audio': { return <VolumeUpIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'video': { return <MovieIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'image': { return <PhotoIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'business': { return <BusinessIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'seat': { return <ChairIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'accessible': { return <AccessibleIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'toilet': { return <WcIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'restaurant': { return <RestaurantIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'child': { return <ChildFriendlyIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'pets': { return <PetsIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'parking': { return <LocalParkingIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'park': { return <ParkIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'train': { return <TrainIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'bus': { return <DirectionsBusIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'taxi': { return <LocalTaxiIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'cafe': { return <LocalCafeIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'bed': { return <HotelIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'smoking': { return <SmokingRoomsIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'bar': { return <LocalBarIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'fastfood': { return <FastfoodIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'gym': { return <FitnessCenterIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'climate': { return <AcUnitIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      case 'training': { return <SchoolIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
      default: { return <TextSnippetOutlinedIcon sx={{ mb: adjust ? '-5px' : 0, color: enabled ? theme => theme.palette.primary.dark : grey[600] }} />; }
    }
  };

  return (<>{renderIcon()}</>);
};
