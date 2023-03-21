import {Divider} from "@mui/material";
import Box from "@mui/material/Box";
import RenderIcon from "../../helperComponents/RenderIcon";
import Typography from "@mui/material/Typography";
import {handleFont} from "../renderers/helper";
import {useTheme} from "@mui/system";
import capitalize from "@mui/utils/capitalize";

interface Props {
  isBorder?: boolean;
  data: any;
  qrType: string;
}

export default function RenderFooter({isBorder, data, qrType}: Props) {
  const theming = useTheme();

  const FooterLabel = () =>{
    let footerLabel;
    switch (qrType) {
      case "custom":
        footerLabel = "Customized";
        break;
      case "video":
        footerLabel = "Videos";
        break;
      case "vcard+":
        footerLabel = "vCard Plus";
        break;
      case "link":
        footerLabel = "Link-in-Bio";
        break;
      case "linkedLabel":
        footerLabel = "Smart Label";
        break;
      default:
        footerLabel = capitalize(qrType)
    }
    return footerLabel;
  }

  return (
    <Box sx={{width: '100%'}}>
      <Divider sx={{mx: 2}} />
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        mb: !isBorder ? 0 : '10px',
        color: theme => theme.palette.secondary.main
      }}>
        {!data.customFooter?.trim().length && <RenderIcon icon={qrType} enabled color={theming.palette.secondary.main}/>}
        <Typography sx={{ml: '5px', ...handleFont(data, 'm'), fontSize: '17px'}}>
          {data.customFooter || FooterLabel()}
        </Typography>
      </Box>
    </Box>
  );
}
