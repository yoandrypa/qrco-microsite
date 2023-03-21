import {alpha} from "@mui/material/styles";
import Box from "@mui/material/Box";

interface Props {
  backImg?: any;
}

export default function RenderBackgroundIfWideScreen({backImg}: Props) {
  return (
    <Box sx={{position: 'fixed', p: 0, m: 0, width: '100%', height: '270px',
      background: theme => !backImg ? alpha(theme.palette.primary.main, 0.9) : 'none'
    }}>
      {backImg && (
        <Box component="img" alt="backgimage" src={backImg.content || backImg}
             sx={{
               filter: 'opacity(0.75) contrast(0.75) blur(10px)',
               width: 'calc(100% + 20px)',
               minHeight: 'calc(100vh + 20px)',
               objectFit: 'cover',
               position: 'fixed',
               top: '-10px',
               left: '-10px'
             }}
        />
      )}
    </Box>
  );
}
