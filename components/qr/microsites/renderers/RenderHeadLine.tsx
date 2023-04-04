import {useMemo, useRef} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/system";

import {handleFont} from "./helper";
import {capitalize} from "@mui/material";

import dynamic from "next/dynamic";

const CalendarMonthIcon = dynamic(() => import("@mui/icons-material/CalendarMonth"));
const LocationOnIcon = dynamic(() => import("@mui/icons-material/LocationOn"));
const AccountBoxIcon = dynamic(() => import("@mui/icons-material/AccountBox"));
const WorkIcon = dynamic(() => import("@mui/icons-material/Work"));
const DoneAllIcon = dynamic(() => import("@mui/icons-material/DoneAll"));
const MarkAsUnreadIcon = dynamic(() => import("@mui/icons-material/MarkAsUnread"));
const LinkIcon = dynamic(() => import("@mui/icons-material/Link"));
const RingVolumeIcon = dynamic(() =>  import("@mui/icons-material/RingVolume"));
const ScheduleIcon = dynamic(() =>  import("@mui/icons-material/Schedule"));
const GroupsIcon = dynamic(() => import("@mui/icons-material/Groups"));
const PhotoSizeSelectActualIcon = dynamic(() => import("@mui/icons-material/PhotoSizeSelectActual"));
const ConfirmationNumberIcon = dynamic(() => import("@mui/icons-material/ConfirmationNumber"));
const TextSnippetIcon = dynamic(() => import("@mui/icons-material/TextSnippet"));
const PetsIcon = dynamic(() => import("@mui/icons-material/Pets"));
const EmailIcon = dynamic(() => import('@mui/icons-material/Email'));
const TagIcon = dynamic(() => import("@mui/icons-material/Tag"));
const ContactMailIcon = dynamic(() => import("@mui/icons-material/ContactMail"));
const PictureAsPdfIcon = dynamic(() => import("@mui/icons-material/PictureAsPdf"));
const TheatersIcon = dynamic(() => import("@mui/icons-material/Theaters"));
const AudiotrackIcon = dynamic(() => import("@mui/icons-material/Audiotrack"));
const SmsOutlinedIcon = dynamic(() => import('@mui/icons-material/SmsOutlined'));
const DonationIcon = dynamic(() => import('@mui/icons-material/EmojiFoodBeverage'));

interface HeadLineProps {
  component: string;
  headLine?: string;
  hideIcon?: boolean;
  stylesData: object;
  centerHeadLine?: boolean;
  customFont?: {
    headlineFont?: string;
    headlineFontSize?: string;
    headLineFontStyle?: string;
  }
}

export default function RenderHeadLine(
  {component, headLine, stylesData, centerHeadLine, hideIcon, customFont}
    : HeadLineProps) {
  const message = useRef<string | null>(null);

  const theme = useTheme();

  const sx = useMemo(() => {
    let size = undefined as undefined | string;
    if (customFont?.headlineFontSize) {
      switch (customFont.headlineFontSize) {
        case 'small' : { size = '22px'; break; }
        case 'medium' : { size = '26px'; break; }
        case 'large' : { size = '30px'; break; }
      }
    }
    return {color: theme.palette.primary.main, mt: '5px', mr: '5px', width: size, height: size}
  }, [customFont?.headlineFontSize]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderIcon = () => {
    if (customFont !== undefined) {
      let color = theme.palette.primary.main;
      let index = -1;
      if (customFont?.headLineFontStyle !== undefined) { index = customFont?.headLineFontStyle?.indexOf('#'); }
      if (index !== -1) { // @ts-ignore
        color = customFont.headLineFontStyle.slice(index);
      }
      sx.color = color;
    }


    switch (component) {
      case 'address': { return <LocationOnIcon sx={sx}/>; }
      case 'links': { return <LinkIcon sx={sx} />; }
      case 'presentation': { return <AccountBoxIcon sx={sx}/>; }
      case 'date': { return <CalendarMonthIcon sx={sx} />; }
      case 'company': { return <WorkIcon sx={sx} />; }
      case 'easiness': { return <DoneAllIcon sx={sx} />; }
      case 'phones': { return <RingVolumeIcon sx={sx} />; }
      case 'gallery': { return <PhotoSizeSelectActualIcon sx={sx} />; }
      case 'tags': { return <TagIcon sx={sx} />; }
      case 'organization': { return <WorkIcon sx={sx}/>; }
      case 'video': { return <TheatersIcon sx={sx} />; }
      case 'audio': { return <AudiotrackIcon sx={sx} />; }
      case 'donation': { return <DonationIcon sx={sx} />; }
      case 'sms': {
        message.current = 'SMS';
        return <SmsOutlinedIcon sx={sx} />;
      }
      case 'pdf': {
        message.current = 'PDF';
        return <PictureAsPdfIcon sx={sx} />;
      }
      case 'contact': {
        message.current = 'Contact form';
        return <ContactMailIcon sx={sx} />;
      }
      case 'justEmail': {
        message.current = 'Email address';
        return <EmailIcon sx={sx} />;
      }
      case 'petId': {
        message.current = 'Pet info';
        return <PetsIcon sx={sx} />;
      }
      case 'keyvalue': {
        message.current = 'Details';
        return <TextSnippetIcon sx={sx} />;
      }
      case 'couponInfo': {
        message.current = 'Coupon info';
        return <WorkIcon sx={sx} />;
      }
      case 'couponData': {
        message.current = 'Coupon data';
        return <ConfirmationNumberIcon sx={sx} />;
      }
      case 'opening': {
        message.current = 'Opening time';
        return <ScheduleIcon sx={sx} />;
      }
      case 'socials': {
        message.current = 'Social networks';
        return <GroupsIcon sx={sx} />;
      }
      case 'email': {
        message.current = 'Email and web';
        return <MarkAsUnreadIcon sx={sx} />;
      }
    }
  };

  return (
    <Box sx={{display: 'flex', mt: 1, justifyContent: !Boolean(centerHeadLine) ? 'left' : 'center'}}>
      {!hideIcon && <Box>{renderIcon()}</Box>}
      <Typography sx={{...handleFont(stylesData, 't', customFont !== undefined ? {
        headlineFont: customFont.headlineFont,
        headlineFontSize: customFont.headlineFontSize,
        headLineFontStyle: customFont.headLineFontStyle
      } : undefined)}}>
        {headLine || message.current || capitalize(component)}
      </Typography>
    </Box>
  );
}
