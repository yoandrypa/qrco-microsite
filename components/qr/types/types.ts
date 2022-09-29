import ChairIcon from "@mui/icons-material/Chair";
import { grey } from "@mui/material/colors";
import AccessibleIcon from "@mui/icons-material/Accessible";
import WcIcon from "@mui/icons-material/Wc";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import PetsIcon from "@mui/icons-material/Pets";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ParkIcon from "@mui/icons-material/Park";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import HotelIcon from "@mui/icons-material/Hotel";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FlightIcon from "@mui/icons-material/Flight";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export type OptionsType = {
  isDynamic?: boolean;
  mode?: string;
  id?: string;
  shortCode?: string;
  width: number;
  height: number;
  type: string;
  data: string;
  image: string | null;
  margin: number;
  qrOptions: { typeNumber: number; mode: string; errorCorrectionLevel: string; };
  imageOptions: { hideBackgroundDots: boolean; imageSize: number; margin: number; crossOrigin: string; };
  dotsOptions: { color: string; type: string; };
  backgroundOptions: { color: string; };
  cornersSquareOptions: { color: string; type: string; };
  cornersDotOptions: { color: string; type: string; };
};

export type BackgroundType = {
  type: string | null;
  opacity: number;
  size: number;
  file: string | null;
  x: number;
  y: number;
  imgSize: number;
  invert?: boolean | false;
  backColor?: string | null;
};

export type CornersAndDotsType = {
  topL: string;
  topR: string;
  bottom: string;
} | null;

export type FramesType = {
  type: string | null;
  text: string;
  color: string;
  textColor: string;
  textUp?: boolean | false;
};

export type OpeningDaysType = {
  opening: { ini: string, end: string }[];
}

export type OpeningType = {
  sun?: OpeningDaysType;
  mon?: OpeningDaysType;
  tue?: OpeningDaysType;
  wed?: OpeningDaysType;
  thu?: OpeningDaysType;
  fri?: OpeningDaysType;
  sat?: OpeningDaysType;
} | {} | null;

export type DataType = {
  qrName?: string;
  number?: string;
  message?: string;
  subject?: string;
  body?: string;
  email?: string;
  name?: string;
  password?: string;
  encription?: string;
  hidden?: string;
  prefix?: string;
  lastName?: string;
  firstName?: string;
  cell?: string;
  phone?: string;
  fax?: string;
  organization?: string;
  position?: string;
  address?: string;
  city?: string;
  zip?: string;
  state?: string;
  country?: string;
  company?: string;
  contacy?: string;
  about?: string;
  title?: string;
  subtitle?: string;
  web?: string;
  url?: string;
  via?: string;
  hashtags?: string;
  text?: string;
  facebook?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  pinterest?: string;
  telegram?: string;
  twitter?: string;
  value?: string;
  is12hours?: boolean;
  openingTime?: OpeningType;
  easiness?: {
    accessible?: boolean;
    toilet?: boolean;
    seat?: boolean;
    child?: boolean;
    pets?: boolean;
    park?: boolean;
    restaurant?: boolean;
    cafe?: boolean;
    bar?: boolean;
    shower?: boolean;
    health?: boolean;
    fastfood?: boolean;
    bed?: boolean;
    gym?: boolean;
    smoking?: boolean;
    climate?: boolean;
    training?: boolean;
    parking?: boolean;
    train?: boolean;
    bus?: boolean;
    taxi?: boolean;
    wifi?: boolean;
  } | undefined;
  isDynamic?: boolean;
  files?: File[];
};

export type CardDataProps = {
  data: DataType;
  setData: Function;
};

export type UpdaterType = {
  options: OptionsType;
  background?: BackgroundType;
  corners?: CornersAndDotsType;
  cornersDot?: CornersAndDotsType;
  frame?: FramesType;
};
