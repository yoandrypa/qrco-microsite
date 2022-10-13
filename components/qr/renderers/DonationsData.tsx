import React from 'react'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import {DonationsData} from "../types/types";
import { Stack, Avatar } from '@mui/material';
import UploadRounded from '@mui/icons-material/UploadRounded'

interface DonationsProps {
    data: DonationsData,
    setData: Function
}

const  DonationsData = (props: DonationsProps) => {
  return (

    <Paper>
   <Alert severity='info'>Generate a custom QR code for your page and give your supporters a quick and touch-free checkout option.</Alert>
   <Typography variant='h6' textAlign={'center'} marginTop={2}>Customize your page</Typography>    
   <Grid container sx={{ display: 'flex', justifyContent: 'center',alignContent:'center' }}>
    <Grid item>      
    </Grid>
    <Grid item>
    <Stack direction="row" sx={{marginTop:2, display: 'flex', justifyContent: 'center',alignSelf:'center' }}>
      <Avatar        
        alt="sljfsf sflS"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        sx={{ width: 100, height: 100,}}
      />
    </Stack>  
    </Grid>
    <Grid item>        
    <Button 
    sx={{marginTop: 2, alignContent: 'center' }}
    startIcon={<UploadRounded/>}
     variant="outlined">
        Upload Image
    </Button>
    </Grid>
   </Grid>
   <Typography textAlign={'center'} marginTop={2}>Add your text here</Typography>
  <Grid  sx={{display: 'flex', alignItems: "center",
        justifyContent: "center"}}>
  <TextField
          label="Make a good one"
          size="small"
          fullWidth
          margin="dense"
        //   value={data?.message || ''}
        //   onChange={handleValues('message')} />
        multiline
        sx={{width: 300, display: 'flex', alignItems: "center",
        justifyContent: "center"}}
        rows={5}
       />
  </Grid>
  <Grid 
  sx={{display: 'flex', alignItems: "center",
        justifyContent: "center"}}>

<TextField label='Website or social link'
sx={{marginTop: 2, width:300 }}>
    https://www.example.com
</TextField>
  </Grid>
  
   </Paper>
 
  )
}

export default DonationsData