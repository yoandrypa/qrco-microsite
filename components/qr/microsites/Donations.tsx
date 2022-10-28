import { ChangeEvent, useMemo, useState,useEffect } from "react";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { getColors } from "./renderers/helper";
import { ColorTypes } from "../types/types";
import Typography from '@mui/material/Typography';
import CardActions from "@mui/material/CardActions";
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import SvgIcon from '@mui/material/SvgIcon'
import Box from '@mui/material/Box'
import { TextField } from "@mui/material";
import MainMicrosite from "./MainMicrosite";
import  LoadingButton from "@mui/lab/LoadingButton";
import axios, {AxiosError} from 'axios'
import Image from "next/image";
import { useRouter } from "next/router";

interface DonationsProps {
  newData: any;
}

type BoxOptions = 'first' | 'second' | 'third' | 'input';

export default function DonationsInfo({ newData }: DonationsProps) {
  const colors = useMemo(() => (getColors(newData)), []) as ColorTypes; // eslint-disable-line react-hooks/exhaustive-deps
  const [selectedBox, setSelectedBox] = useState<BoxOptions>('first')
  const [inputValue, setInputValue] = useState<string>('1')
  const [donationAmount, setDonationAmount] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paylinkUrl, setPaylinkUrl] =  useState<string | null>(null)

  useEffect(() => {
    if (parseInt(inputValue) <= 1){
      setDonationAmount(parseInt(newData.donationUnitAmount))
      setInputValue('1')
      setSelectedBox('first')
    } else {
      setDonationAmount(parseInt(inputValue) * newData.donationUnitAmount as number)
    }


  }, [inputValue, newData.donationUnitAmount])

console.log(newData)
  const handleBoxClick = (box: BoxOptions) => {
    if (box === 'first') {
      setSelectedBox('first')
      setInputValue('1')
      setDonationAmount(newData.donationUnitAmount )
    }
    if (box === 'second') {
      setSelectedBox('second')
      setInputValue('3')
      setDonationAmount(3 * newData.donationUnitAmount)
    }
    if (box === 'third') {
      setSelectedBox('third')
      setInputValue('5')
      setDonationAmount(5 * newData.donationUnitAmount )
    }

  }


 const router = useRouter();

 useEffect(()=>{
 paylinkUrl && router.push(paylinkUrl)
 },[paylinkUrl, router])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>)=>{

    if (parseInt(event.target.value,10) <= 1 ){
      setInputValue('1')
      setDonationAmount(newData.donationUnitAmount)
      setSelectedBox('first')
    }
    if (parseInt(event.target.value,10) === 1){
      setInputValue(event.target.value)
      setSelectedBox('first')
      setDonationAmount(1 * newData.donationUnitAmount)
      }
      if (parseInt(event.target.value,10) === 5){
        setSelectedBox('third')
        setDonationAmount(5 * newData.donationUnitAmount)
        setInputValue('5')
      } else
      if (parseInt(event.target.value,10) === 3){
          setInputValue(event.target.value)
          setSelectedBox('second')
          setDonationAmount(3 * newData.donationUnitAmount)
      } else {
        setSelectedBox('input')
      }
      setInputValue(event.target.value)
      setDonationAmount(parseInt(event.target.value) * newData.donationUnitAmount )

  }
  const  handleClick = async ()=>{
        setIsLoading(true)
        try {
          const response = await axios.post('/donationpaylink',{
            priceId: newData.donationPriceId,
            paylinkQuantity: newData.donationUnitAmount,
            successUrl: newData.web || newData.shortlinkurl + `?thanks=true`
          },{
            baseURL: process.env.REACT_NODE_ENV === 'develop' ? 'https://dev.ebanux.link/' : 'https://ebanux.link/'
          })
          setPaylinkUrl(response.data.result.url)
        if (response instanceof AxiosError){
          return;
        }

        } catch (error) {

        }

  }
 const { thanks } = router.query;

  return (
    //TODO
    <MainMicrosite colors={colors} url={newData.shortlinkurl} foregndImg={newData.foregndImg} backgndImg={newData.backgndImg}>
   { !thanks ? ( <CardContent>
      <Grid container
        display='flex'
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item  sx={{ RoundedCorner: 2 }} >
          <Typography variant='h6' textAlign={'center'} padding={0} marginTop={2}>{newData?.title}</Typography>
          <Typography variant='h6' textAlign={'center'}>Would you like to buy me a coffie?</Typography>
          {/* <Stack direction="row" sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignSelf: 'center' }}>
            <Avatar
              alt="Avatar"
              src="https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
              sx={{ width: 100, height: 100, }}
            />
          </Stack> */}

        </Grid>
        <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Typography>
            {newData?.message}
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>

          <Typography>
            {newData?.web}
          </Typography>
        </Grid>

        <Grid spacing={1} container sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Grid item>
            <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
              <SvgIcon sx={{ width: 35, height: 35 }}>
                <EmojiFoodBeverageIcon color='primary' />
              </SvgIcon>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
              <Typography textAlign='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
                x
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box
              onClick={() => handleBoxClick('first')}
              sx={{
                borderRadius: 45, borderColor: 'blue', backgroundColor: 'lightblue',
                width: 35, height: 35, display: 'flex', justifyContent: 'center',
                alignContent: 'center', margin: 'auto'
              }}
              border={selectedBox === 'first' ? 2 : 0}
            >
              <Typography textAlign='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
                1
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box
              border={selectedBox === 'second' ? 2 : 0}
              onClick={() => handleBoxClick('second')}
              sx={{ borderRadius: 45, borderColor: 'blue', backgroundColor: 'lightblue', width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
              <Typography textAlign='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
                3
              </Typography>
            </Box>
          </Grid>
          <Grid item >
            <Box
              border={selectedBox === 'third' ? 2 : 0}
              onClick={() => handleBoxClick('third')}
              sx={{ borderRadius: 45, borderColor: 'blue', backgroundColor: 'lightblue', width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}
            >
              <Typography textAlign='center'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  margin: 'auto'
                }}>
                5
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={{ width: 35, height: 35, display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }} >
              <Typography textAlign='center' sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', margin: 'auto' }}>
                or
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <TextField
              onFocus={() => handleBoxClick('input')}
              sx={{ width: 80 }}
              //  label='Amount'
              size="small"
              type='number'
              placeholder="25"
              value={inputValue}
              onChange={handleInputChange}
            ></TextField>
          </Grid>

        </Grid>

        <Grid container sx={{ display: 'flex',marginTop:1, justifyContent: 'center', alignContent: 'center' }}>
         { donationAmount && <Typography variant="h6"> Send ${donationAmount} USD</Typography>}
        </Grid>
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <CardActions sx={{ marginTop: 2 }}>
            <LoadingButton disabled={!newData.donationPriceId} onClick={handleClick} loading={isLoading}  color="primary" variant="contained" sx={{ borderRadius: 2 }}>
              Donate
            </LoadingButton>

          </CardActions>

        </Grid>
      </Grid>
    </CardContent>) :
    (
      <CardContent>
        <Typography variant="h5" textAlign={'center'}>Thanks for your support!</Typography>
        <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <Image style={{}} width={200} height={200} alt='thanks' src='/images/thanks2.png'></Image>
        </Box>
      </CardContent>
    )}
    </MainMicrosite>
  );
}
