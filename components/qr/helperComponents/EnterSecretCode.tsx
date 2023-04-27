import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";

interface SecretProps {
  locked: string;
  setProceed: (proceed: boolean) => void;
}

export default function EnterSecretCode({locked, setProceed}: SecretProps) {
  const [passw, setPassw] = useState<string | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisibilitiy = () => {
    setVisible((prev: boolean) => !prev);
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {setError(false);}, 3000);
    }
  }, [error]);

  return (
    <Box sx={{width: '100%', textAlign: 'center'}}>
      <LockOutlinedIcon fontSize="large" color="primary" sx={{my: '30px'}} />
      <Typography>
        Enter the secret code to unlock.
      </Typography>
      <TextField
        sx={{mt: 4, width: 'calc(100% - 50px)'}}
        value={passw || ''}
        size="small"
        type={visible ? 'text' : 'password'}
        label="Secret code"
        onChange={e => setPassw(e.target.value)}
        placeholder="Enter the secret code here"
        InputProps={{
          startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">
            <IconButton onClick={handleVisibilitiy}>
              {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button startIcon={<LockOpenOutlinedIcon />} sx={{mt: 1, width: 'calc(100% - 50px)'}} color="primary"
              variant="outlined" disabled={!passw?.length}
              onClick={() => {
                if (passw === locked) {setProceed(true);} else {setError(true);}
              }}>
        {'Unlock'}
      </Button>
      {error && <Typography sx={{ mt: 2, color: 'error.main', fontWeight: 'bold' }}>Secret code not valid!</Typography>}
    </Box>
  );
}
