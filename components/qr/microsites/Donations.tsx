import { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { handleFont } from "./renderers/helper";
import Typography from '@mui/material/Typography';
import CofeeIcon from '@mui/icons-material/Coffee';
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import TextField from "@mui/material/TextField";
import MainMicrosite from "./MainMicrosite";
import { useRouter } from "next/router";
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"

import ThankYou from "../helperComponents/ThankYou";
import { useTheme } from "@mui/system";


interface DonationsProps {
  newData: any;
}

export default function DonationsInfo({ newData }: DonationsProps) {
  const [inputValue, setInputValue] = useState<string>('1')
  const [donationAmount, setDonationAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paylinkUrl, setPaylinkUrl] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const theming = useTheme();

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
    setIsLoading(true)

    const url = process.env.REACT_NODE_ENV == 'develop' ?
      'https://dev.ebanux.link' :
      'https://ebanux.link';

    const data = {
      priceId: newData.donationPriceId,
      paylinkQuantity: inputValue,
      successUrl: newData.shortlinkurl + `?thanks=true`
    }

    const options = {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    };

    try {
      const response = await fetch(`${url}/donationpaylink`, options)
      if (!response.ok) {
        setIsDialogOpen(true);
      } else {
        const data = await response.json();
        setPaylinkUrl(data.result.url)
      }
    } catch (error: any) {
      //exceptions
      setIsDialogOpen(true);
    }

  }

  const { thanks } = router.query;

  return (
    //TODO
    <MainMicrosite data={newData}>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogContentText>
            Ops, something went wrong. Check your Internet connection.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setIsDialogOpen(false);
              setIsLoading(false)
            }}
          >Ok</Button>
        </DialogActions>
      </Dialog>
      {!thanks ? (
        <CardContent sx={{ height: '100%' }}>
          <Grid container
            display='flex'
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item sx={{ RoundedCorner: 2 }} >
              <Typography variant='h6' textAlign={'center'} padding={0} marginTop={2} sx={{ fontFamily: getFont(newData) }}>{newData?.title}</Typography>
            </Grid>
            <Grid container sx={{ margin: 2, display: 'flex', justifyContent: 'center', alignContent: 'center', padding: 0, fontFamily: getFont(newData) }}>
              <Typography sx={{ fontFamily: getFont(newData) }}>
                {newData?.message}
              </Typography>
            </Grid>

            <Grid spacing={1} container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
              <Grid item >
                <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
                  <SvgIcon sx={{ width: 35, height: 35 }}>
                    <CofeeIcon color='primary' />
                  </SvgIcon>
                </Box>
                <Box sx={{ width: 40, height: 40, display: 'flex', justifyContent: 'left', alignContent: 'left' }} >
                  <Typography textAlign='left' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', fontFamily: getFont(newData) }}>
                    ${newData.donationUnitAmount || 1} each
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
                  <Typography textAlign='center' paddingTop={2} sx={{ fontFamily: getFont(newData) }}>
                    or
                  </Typography>
                </Box>
              </Grid>
              <Grid item sx={{ marginLeft: 2 }}>
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
                    backgroundColor: theme => theme.palette.secondary.main,
                    width: 35,
                    height: 35
                  }}>
                  -
                </Button>

              </Grid>

              <Grid item >
                <TextField
                  sx={{ width: 60, borderRadius: 40, alignContent: 'center', display: 'flex', alignItems: 'center', fontFamily: getFont(newData) }}

                  size="small"
                  placeholder="25"
                  value={inputValue}
                  onChange={handleInputChange}
                  inputProps={{ min: 1, max: 80, style: { textAlign: 'center' } }}
                ></TextField>
              </Grid>

              <Grid item >
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
                    backgroundColor: theme => theme.palette.secondary.main,
                    alignContent: 'center',
                    width: 35, height: 35,
                    margin: 'auto'
                  }}>
                  +
                </Button>
              </Grid>
            </Grid>

            <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <LoadingButton
                loading={isLoading}
                style={{ backgroundColor: theming.palette.primary.main, borderRadius: 45 }}
                onClick={handleClick}
                variant="contained" sx={{ borderRadius: 2 }}>
                {newData.urlOptionLabel || 'Donate'} ${donationAmount || 1}
              </LoadingButton>
            </Grid>
          </Grid>
        </CardContent>
      ) :
        (
          <ThankYou qrData={newData} />
        )
      }
    </MainMicrosite >

  );
}
