import { grey } from "@mui/material/colors";
import {capitalize} from "@mui/material";
import * as MUIIcons from './Icons';
import * as systemIcons from "../../icons/system";

type RenderIconProp = {
  icon: string;
  enabled: boolean;
  adjust?: boolean;
  color?: string;
  colorSec?: string;
  size?: string;
  style?: object;
};

export default function RenderIcon({ icon, color, colorSec, enabled, adjust, size, style }: RenderIconProp) {
  const renderIcon = () => {
    const sx = { mb: adjust ? '-5px' : 0, color: enabled ? color : grey[600], ...style } as any;
    if (size) {
      sx.width = size;
      sx.height = size;
    }

    if (colorSec) {
      sx['&:hover'] = {
        color: colorSec, background: color, borderRadius: '25%'
      }
    }

    if (icon === 'tiktok') {
      return <MUIIcons.TikTok color={color} size={size} sx={sx} />;
    }

    if (icon === 'quora') {
      return <MUIIcons.Quora color={color} size={size} sx={sx} />;
    }

    if (icon === 'twitch') {
      return <MUIIcons.Twitch color={color} size={size} sx={sx} />;
    }

    if (icon === 'snapchat') {
      return <MUIIcons.Snapchat color={color} size={size} sx={sx} />;
    }

    if (icon === 'discord') {
      return <MUIIcons.Discord color={color} size={size} sx={sx} />;
    }

    let iconName = capitalize(icon);
    switch (iconName) {
      case 'Call':
      case 'CompanyPhone': { iconName = 'Phone'; break; }
      case 'CompanyCell':
      case 'Cell': { iconName = 'CellPhone'; break; }
      case 'CompanyFax': { iconName = 'Fax'; break; }
      case 'Contact':
      case 'Vcard': { iconName = 'VCard'; break; }
      case 'Vcard+': { iconName = 'VCardPlus'; break; }
      case 'Email': { iconName = 'AltEmail'; break; }
      case 'EmailIcon': { iconName = 'Email'; break; }
      case 'Gallery': { iconName = 'Image'; break; }
      case 'PetId': { iconName = 'Pets'; break; }
      case 'Fastfood': { iconName = 'FastFood'; break; }
      case 'Fundme': { iconName = 'FundMe'; break; }
      case 'Paylink': { iconName = 'PayLink'; break; }
      case 'LinkedLabel': { iconName = 'QrCode'; break; }
      case 'Tiktok': { iconName = 'TikTok'; break; }
      case 'Whatsapp': { iconName = 'WhatsApp'; break; }
      case 'Linkedin': { iconName = 'LinkedIn'; break; }
      case 'Youtube': { iconName = 'YouTube'; break; }
    }

    // @ts-ignore
    let Icon = MUIIcons[iconName];
    if (!Icon) { // @ts-ignore
      Icon = systemIcons[iconName];
    }

    if (!Icon) {
      return <MUIIcons.Text sx={sx} />;
    }

    return <Icon sx={sx} />;
  };

  return renderIcon();
};
