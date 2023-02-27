import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GetAppIcon from '@mui/icons-material/GetApp';
import {useTheme} from "@mui/system";

import {downloadVCard, handleButtons, handleFont} from "./helper";
import {handleDesignerString} from "../../../../helpers/qr/helpers";

interface DownloadVCardProps {
  styled: any;
  data: any;
}

export default function RenderDownloadVCard({styled, data}: DownloadVCardProps) {
  const theme = useTheme();

  const handleDownload = () => {
    if (window && /Android|iPhone/i.test(navigator.userAgent)) {
      const output = encodeURIComponent(handleDesignerString("vcard+", {...data}));
      window.open(`data:text/x-vcard;urlencoded,${output}`);
    } else {
      downloadVCard({...data});
    }
  }

  return (
    <Box sx={{ textAlign: 'center', mt: '10px', width: '100%' }}>
      <Button
        variant="contained"
        startIcon={<GetAppIcon />}
        sx={{...handleFont(styled, 'b'), ...handleButtons(styled, theme)}}
        onClick={handleDownload}
      >{'Get Contact'}</Button>
      <Box sx={{height: '35px'}}/>
    </Box>
  );
}
