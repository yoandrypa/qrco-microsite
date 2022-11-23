import { useMemo, useState, useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { getColors } from "./renderers/helper";
import { ColorTypes } from "../types/types";
import Typography from '@mui/material/Typography';
import CardActions from "@mui/material/CardActions";
import CofeeIcon from '@mui/icons-material/Coffee';
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

import MainMicrosite from "./MainMicrosite";
import LoadingButton from "@mui/lab/LoadingButton";
import axios, { AxiosError } from 'axios'
import Image from "next/image";
import { useRouter } from "next/router";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button'

interface DonationsProps {
  newData: any;
}

type BoxOptions = 'first' | 'second' | 'third' | 'input';

export default function DonationsInfo({ newData }: DonationsProps) {
  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps
  const [inputValue, setInputValue] = useState<string>('1')
  const [donationAmount, setDonationAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paylinkUrl, setPaylinkUrl] = useState<string | null>(null)
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    if (parseInt(inputValue) < 1) {
      setDonationAmount(parseInt(newData.donationUnitAmount))
      setInputValue('1')
    }
    if (parseInt(inputValue) >= 100) {
      setDonationAmount(100)
      setInputValue('100')
    } else {
      setDonationAmount(parseInt(inputValue) * (newData.donationUnitAmount || 1) as number)
    }
  }, [inputValue, newData.donationUnitAmount, donationAmount])

  const router = useRouter();

  useEffect(() => {
    paylinkUrl && router.push(paylinkUrl)
  }, [paylinkUrl, router])

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value, 10) <= 1) {
      setInputValue('1')
      setDonationAmount(newData.donationUnitAmount)

    }
    if (parseInt(event.target.value, 10) >= 100) {
      setInputValue('100')
      setDonationAmount(100 * newData.donationUnitAmount)
    }

    setInputValue(event.target.value)
    setDonationAmount(parseInt(event.target.value) * newData.donationUnitAmount)

  }


  const handleClick = async () => {
    console.log('hanlde click')
    setIsLoading(true)
    try {
      const response = await axios.post('/donationpaylink', {
        priceId: newData.donationPriceId,
        paylinkQuantity: inputValue,
        successUrl: newData.web || newData.shortlinkurl + `?thanks=true`
      }, {
        baseURL: process.env.REACT_NODE_ENV === 'develop' ? 'https://dev.ebanux.link/' : 'https://ebanux.link/'
      })
      setPaylinkUrl(response.data.result.url)
      if (response instanceof AxiosError) {
        console.log(response)
        return;
      }

    } catch (error) {
      console.log('error', error)
    }

  }
  const { thanks } = router.query;


  const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: colors.p,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: colors.s,
        main: colors.s,
        // dark: will be calculated from palette.secondary.main
      }
    }
  });
  console.log('newdate', newData)
  return (
    //TODO
    <MainMicrosite
      colors={colors}
      url={newData.shortlinkurl}
      type={newData.qrType}
      foregndImg={newData.foregndImg}
      backgndImg={newData.backgndImg}
      foregndImgType={newData.foregndImgType}
      isSample={newData.isSample}>
      {!thanks ? (
        <ThemeProvider theme={theme}>
          <CardContent sx={{ height: '100%' }}>
            <Grid container
              display='flex'
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item sx={{ RoundedCorner: 2 }} >
                <Typography variant='h6' textAlign={'center'} padding={0} marginTop={2}>{newData?.title}</Typography>
              </Grid>
              <Grid container sx={{ margin: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Typography>
                  {newData?.message}
                </Typography>
              </Grid>
              <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

                <Typography>
                  {newData?.web}
                </Typography>
              </Grid>

              <Grid spacing={1} container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
                <Grid item xs>
                  <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
                    <SvgIcon sx={{ width: 35, height: 35 }}>
                      <CofeeIcon color='primary' />
                    </SvgIcon>
                  </Box>
                  <Box sx={{ width: 60, height: 40, display: 'flex', justifyContent: 'left', alignContent: 'left' }} >
                    <Typography textAlign='left' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                      ${newData.donationUnitAmount || 1} each
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs >
                  <Button
                    variant="contained"
                    onClick={() => {
                      const temp = parseInt(inputValue) - 1;
                      setInputValue(temp >= 100 ? '100' : temp.toString())
                    }}
                    sx={{
                      borderRadius: 45,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: 35,
                      height: 35
                    }}>
                    -
                  </Button>

                </Grid>

                <Grid item xs>
                  <TextField
                    sx={{ width: 60, borderRadius: 40, alignContent: 'center', display: 'flex', alignItems: 'center' }}

                    size="small"
                    placeholder="25"
                    value={inputValue}
                    onChange={handleInputChange}
                    inputProps={{ min: 1, max: 80, style: { textAlign: 'center' } }}
                  ></TextField>
                </Grid>

                <Grid item xs>

                  <Button
                    variant="contained"
                    onClick={() => {
                      const temp = parseInt(inputValue) + 1;
                      setInputValue(temp.toString())
                    }}
                    sx={{
                      borderRadius: 45,
                      display: 'flex',
                      justifyContent: 'center',
                      alignContent: 'center',
                      width: 35, height: 35,
                      margin: 'auto'
                    }}>
                    +
                  </Button>
                </Grid>
              </Grid>

              <Grid container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: 2 }} >
                <ThemeProvider theme={theme}>
                  <FormGroup>
                    <FormControlLabel control={<Switch
                      onChange={handleSwitchChange}
                      color='primary'
                    />}
                      label="Give my message privately."
                      checked={checked}
                      name='private'
                    />
                  </FormGroup>
                  <TextField
                    size="small"
                    type='text'
                    rows={4}
                    multiline
                    placeholder="Would you like to say something nice?"
                  // value={}
                  // onChange={handleInputChange}
                  ></TextField>
                </ThemeProvider>
              </Grid>
              <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Button style={{ backgroundColor: colors.p }}
                  onClick={handleClick}
                  variant="contained" sx={{ borderRadius: 2 }}>
                  {newData.urlOptionLabel || 'Donate'} ${donationAmount || 1}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </ThemeProvider>) :
        (
          <CardContent>
            <Typography variant="h5" textAlign={'center'}>Thanks for your support!</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <Image width={200} height={200} alt='thanks' src='/images/thanks2.png'></Image>
            </Box>

          </CardContent>

        )
      }
    </MainMicrosite >

  );
}
