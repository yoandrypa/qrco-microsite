import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import RenderIcon from "../../helperComponents/RenderIcon";
import {DEFAULT_COLORS} from "../../constants";
import { Link } from "@mui/material";

interface RenderFieldProps {
  size?: number;
  label?: string;
  value: string;
  icon?: string;
  color?: string;
  link?: string;
  sx?: Object;
}

export default function RenderField({size, label, value, icon, color, link, sx}: RenderFieldProps) {
  
  const component = (
    <Grid item xs={size || 12} sx={{pt: 0}}>
      <TextField
        sx={{'.MuiInputBase-input': { mt: '-1px', ...sx }}}
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
              <RenderIcon icon={icon} enabled color={color || DEFAULT_COLORS.s}/>
            </InputAdornment>
          ) : undefined
        }}
      />
    </Grid>
  );
  return link ? (<Link href={link} target="_blank" rel="noopener noreferrer">{component}</Link>) : component;
}
