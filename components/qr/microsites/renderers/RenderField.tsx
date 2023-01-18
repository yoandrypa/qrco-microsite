import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
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
  sx?: Object;
}

export default function RenderField({size, label, value, icon, link, sx}: RenderFieldProps) {
  const theme = useTheme();

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
              <RenderIcon icon={icon} enabled color={theme.palette.secondary.main}/>
            </InputAdornment>
          ) : undefined
        }}
      />
    </Grid>
  );
  return link ? (<Link href={`https://${link}`} target="_blank" rel="noopener noreferrer">{component}</Link>) : component;
}
