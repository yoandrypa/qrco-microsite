import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";
import {Link} from "@mui/material";
import {useTheme} from "@mui/system";

interface RenderFieldProps {
  size?: number;
  label?: string;
  value: string;
  icon?: string;
  link?: string;
  phone?: boolean;
  fax?: boolean;
  email?: boolean;
  sx?: Object;
}

export default function RenderField({size, label, value, icon, link, sx, phone, fax, email}: RenderFieldProps) {
  const theme = useTheme();

  const component = (wrapped?: boolean) => (
      <TextField
        sx={{'.MuiInputBase-input': { cursor: wrapped ? 'pointer' : 'inherit',  mt: '-1px', ...sx }}}
        label={label || ''}
        size="small"
        fullWidth
        multiline
        margin="dense"
        variant="standard"
        value={value}
        InputProps={{
          disableUnderline: true,
          startAdornment: icon ? (
            <InputAdornment position="start">
              <RenderIcon icon={icon} enabled color={theme.palette.secondary.main}/>
            </InputAdornment>
          ) : undefined
        }}
      />
  );

  const renderItem = () => {
    let url = link ? link : `${phone ? 'tel' : (fax ? 'fax' : 'mailto')}:${value}`;

    if (link && !url.toLowerCase().startsWith('https://') && !url.toLowerCase().startsWith('http://')) {
      url = `https://${url}`;
    }

    return (<Link href={url} target="_blank" rel="noopener noreferrer"
      style={{cursor: 'pointer', width: '100%', textDecoration: 'none', marginLeft: link || email ? '7px' : 'unser'}}>{component(true)}</Link>);
  }

  return link || phone || fax || email ? renderItem() : component();
}
