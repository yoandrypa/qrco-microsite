import { useMemo } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { getColors } from "./renderers/helper";
import { ColorTypes } from "../types/types";
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import { TextField } from "@mui/material";
interface DonationsProps {
  newData: any;
}

export default function DonationsInfo({ newData }: DonationsProps) {
  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps

  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: colors.p,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main

      },
      secondary: {
        // light: '#0066ff',
        main: colors.p,
        // dark: will be calculated from palette.secondary.main,
        contrastText: colors.s,
      },

      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });



  return (
    //TODO
      <CardContent>

        <Grid container
          display='flex'
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={3} sx={{ RoundedCorner: 2 }} >
              <Typography variant='h6' textAlign={'center'} marginTop={2}>{newData?.title}</Typography>
              <Typography variant='h6' textAlign={'center'} marginTop={2}>Would you like to buy me a coffie?</Typography>
              <Stack direction="row" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
                <Avatar
                  alt="Avatar"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                  sx={{ width: 100, height: 100, }}
                />
              </Stack>

         

        </Grid>
        <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Typography>
            {newData?.message}
          </Typography>
          <Typography>
            {newData?.web}
          </Typography>
        </Grid>
        <Grid spacing={1} container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
         <Grid item>
            <SvgIcon>
              <EmojiFoodBeverageIcon color='primary'/>
            </SvgIcon> 
         </Grid>
         <Grid item>
           <Typography >
            x
           </Typography>
         </Grid>
         <Grid item>
           <Box sx={{borderRadius:45, backgroundColor: 'lightblue', width:35,height:35, display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}} >
            <Typography textAlign='center' sx={{display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}}>
              1
            </Typography>
           </Box>
         </Grid>
         <Grid item>
           <Box sx={{borderRadius:45, backgroundColor: 'lightblue', width:35,height:35, display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}} >
            <Typography textAlign='center' sx={{display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}}>
              3
            </Typography>
           </Box>
         </Grid>
         <Grid item>
           <Box sx={{borderRadius:45, backgroundColor: 'lightblue', width:35,height:35, display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}} >
            <Typography textAlign='center' sx={{display: 'flex', justifyContent: 'center', alignContent: 'center' , margin:'auto'}}>
              5
            </Typography>
           </Box>
         </Grid> 
         <Grid item>
           <TextField
           sx={{width: 80}}
           label='Amount'
           size="small"
           type='number'
           placeholder="25"
           ></TextField>
         </Grid> 
       

        </Grid>

        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <CardActions sx={{ marginTop: 2 }}>
            <Button color="primary" variant="contained" sx={{borderRadius: 2}}>
              Donate
            </Button>

          </CardActions>
         
        </Grid>
        </Grid>
      </CardContent>

  );
}
