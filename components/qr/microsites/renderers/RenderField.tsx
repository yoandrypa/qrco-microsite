import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";

import {useTheme} from "@mui/system";

import Link from "next/link";
import dynamic from "next/dynamic";

const Typography = dynamic(() => import("@mui/material/Typography"));
const Box = dynamic(() => import("@mui/material/Box"));
const PhoneForwardedIcon = dynamic(() => import("@mui/icons-material/PhoneForwarded"));

interface RenderFieldProps {
  label?: string;
  value: string;
  icon?: string;
  link?: string;
  phone?: boolean;
  whatsapp?: boolean;
  fax?: boolean;
  email?: boolean;
  sx?: any;
}

export default function RenderField({label, value, icon, link, sx, phone, fax, email, whatsapp}: RenderFieldProps) {
  const theme = useTheme();

  const component = (wrapped?: boolean) => {
    if (phone || fax || whatsapp) {
      return (
        <Box sx={{width: '100%', display: 'flex', my: 1}}>
          {icon && <RenderIcon icon={icon} enabled color={theme.palette.secondary.main}/>}
          <Typography sx={{...sx, mx: '5px'}}>{value}</Typography>
          <PhoneForwardedIcon sx={{color: theme.palette.secondary.main, cursor: 'pointer', width: '28px', height: '28px', mt: '-2px'}} />
        </Box>
      );
    }

    return (
      <TextField
        sx={{'.MuiInputBase-input': { cursor: wrapped ? 'pointer' : 'inherit',  mt: '-1px', ...sx}}}
        label={label || ''}
        size="small"
        fullWidth
        multiline
        margin="dense"
        variant="standard"
        value={value}
        InputProps={{
          disableUnderline: true,
          startAdornment: icon && (
            <InputAdornment position="start">
              <RenderIcon icon={icon} enabled color={theme.palette.secondary.main}/>
            </InputAdornment>
          )
        }}
      />
    );
  };

  const renderItem = () => {
    let url = link ? link : `${phone ? 'tel' : (fax ? 'fax' : 'mailto')}:${value}`;

    if (phone) {
      url = `tel:${value}`;
    } else if (fax) {
      url = `fax:${value}`;
    } else if (whatsapp) {
      url = `https://wa.me/${value}`;
    } else if (email) {
      url = `mailto:${value}`;
    } else if (link && !url.toLowerCase().startsWith('https://') && !url.toLowerCase().startsWith('http://')) {
      url = `https://${url}`;
    }

    return (
      <Link href={url} target="_blank" rel="noopener noreferrer"
        style={{
          cursor: 'pointer',
          width: '100%',
          zIndex: 1000,
          textDecoration: 'none',
          marginLeft: link || email ? (sx?.ml ? sx.ml : '7px') : 'unset'
        }}>
        {component(true)}
      </Link>
    );
  }

  return link || phone || fax || email || whatsapp ? renderItem() : component();
}
