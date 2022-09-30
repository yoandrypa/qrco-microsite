import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import {ChangeEvent, useContext} from "react";
import Context from "../../context/Context";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

interface QRNameProps {
  qrName?: string;
  handleValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function RenderQRName({qrName, handleValue}: QRNameProps) {
  // @ts-ignore
  const { userInfo } = useContext(Context);

  if (!Boolean(userInfo)) {
    return null;
  }

  return (
    <>
      <TextField
        label="QR name"
        required
        size="small"
        fullWidth
        margin="dense"
        value={qrName || ''}
        onChange={handleValue}
        InputProps={{
          endAdornment: (
            !Boolean(qrName?.trim().length) ? (<InputAdornment position="end">
              <Typography color="error">REQUIRED</Typography>
            </InputAdornment>) : null
          )
        }}
      />
      <Divider sx={{ my: '10px' }} />
    </>
  );
}
