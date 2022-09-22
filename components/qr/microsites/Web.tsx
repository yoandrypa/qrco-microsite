import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ForwardIcon from "@mui/icons-material/Forward";
import TextField from "@mui/material/TextField";

import MainMicrosite from "./MainMicrosite";

interface WebProps {
  newData: any;
}

export default function Web({newData}: WebProps) {
  return (
    <MainMicrosite>
      <CardContent>
        <TextField
          label="Website address"
          size="small"
          fullWidth
          margin="dense"
          // @ts-ignore
          value={newData.value}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton target="_blank" component="a" href={newData.value}><ForwardIcon/></IconButton>
              </InputAdornment>
            )
          }}
        />
      </CardContent>
    </MainMicrosite>
  );
}
