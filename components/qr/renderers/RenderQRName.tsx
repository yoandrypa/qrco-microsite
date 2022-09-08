import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import Context from "../../context/Context";

interface QRNameProps {
  qrName?: string;
  handleValues: Function;
}

export default function RenderQRName({qrName, handleValues}: QRNameProps) {
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
        onChange={handleValues('qrName')} />
      <Divider sx={{ my: '10px' }} />
    </>
  );
}
