import React from 'react'
import { useState, useEffect, useContext } from 'react'
import PlanCard from '../../components/plans/plancard'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../libs/aws/aws-exports'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/router';
import Context from '../../components/context/Context'
import axios, { AxiosError } from 'axios'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import BillingPortal from '../../components/billing/BillingPortal'
import {find} from '../../handlers/users'
type Props = {
  logged: boolean,
  profile?: object
  planType?: string
}

Amplify.configure(awsconfig);

const Plans = (props: Props) => {


  const [user, setUser] = useState<any>(null);
  const [mustLogInDlg, setMustLogInDlg] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // @ts-ignore
  const { userInfo } = useContext(Context)
  const API = axios.create({
    baseURL: process.env.REACT_APP_DEFAULT_DOMAIN === 'localhost:3000' ?
      `http://${process.env.REACT_APP_DEFAULT_DOMAIN}` :
      `https://${process.env.REACT_APP_DEFAULT_DOMAIN}`

  });
  if(props.logged){
    console.log(props.profile)
    //TODO  add logic for customer portal here
  }
   


  useEffect(() => {
    // Auth.currentAuthenticatedUser()
    //     .then(currentUser => setUser(currentUser.attributes.email))
    //     .catch(() => setUser(null));

    // console.log(user)       
    //@ts-ignore
    (userInfo != null && userInfo != undefined) && setUser(userInfo)
    
  }, [userInfo]);



  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter()

  const basic = {
    title: "Basic Account",
    description: "For small businesses/freelancers at an affordable price.",
    buttonText: "Subscribe",
    plan_type: "basic",
    legend: "A good choice to get started",
    highlighted: false,
    priceAmount: "$9",
    features: [
      "Up to 5 Dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],

  }
  const basicAnnual = {
    title: "Basic Account",
    description: "A good choice to get started",
    buttonText: "Subscribe",
    plan_type: "basicAnnual",
    legend: "Save two months",
    highlighted: false,
    priceAmount: "$90",
    features: [
      "Up to 5 Dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],

  }

  const business = {
    title: "Business Account",
    description: "For medium business/freelancers who need a more complete solution.",
    buttonText: "Subscribe",
    plan_type: "business",
    legend: "Have plenty of room to grow.",
    highlighted: false,
    priceAmount: "$15",
    features: [
      "Up to 100 Dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],
  }
  const businessAnnual = {
    title: "Business Account",
    description: "Receive a great discount with our annual plan.",
    buttonText: "Subscribe",
    plan_type: "businessAnnual",
    legend: "Have plenty of room to grow.",
    highlighted: false,
    priceAmount: "$150",
    features: [
      "Up to 100 Dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],

  }

  const premium = {
    title: "Premium Account",
    description: "The definitive plan. You're completely covered.",
    buttonText: "Subscribe",
    plan_type: "premium",
    legend: "Limitless",
    highlighted: true,
    priceAmount: "$45",
    features: [
      "Unlimited dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],
  }
  const premiumAnnual = {
    title: "Premium Account",
    description: "The definitive plan. You're completely covered.",
    buttonText: "Subscribe",
    plan_type: "premiumAnnual",
    legend: "With a great discount. You deserve the best",
    highlighted: true,
    priceAmount: "$360",
    features: [
      "Unlimited dynamic QR codes",
      "Unlimited statc QR codes",
      "Unlimited scans"
    ],
  }


  const handleClick = async (plan: string) => {
    if (!props.logged) {
      setMustLogInDlg(true)
    } else {

      try {
        const response = await API.post(`/api/create-customer`, {
          id: user.attributes.sub,
          email: user.attributes.email,
          plan_type: plan
        })

        if (response.status === 200 && response.data.result.url) {
          window.location.href = response.data.result.url
        }

      } catch (error) {
        const errorMessage = error instanceof AxiosError ? error.message : 'Something went wrong'
        setError(errorMessage)
      }



    }
  }

  const handleTabChange = (event: React.SyntheticEvent, value: number) => {
    setActiveTab(value)
  }

  // const action = (
  //   <Button onClick={()=> window.location.href = 'mailto:'} color="primary" variant='contained' sx={{ marginLeft: 2 }} size="small">
  //     Support
  //   </Button>
  // );

  return (
    <>
      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert onClose={() => setError(null)} variant="filled" severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Dialog open={mustLogInDlg}>
        <DialogContent>
          In order to buy a plan, you must login first!
        </DialogContent>
        <DialogActions>
          <Button onClick={async () => {
            await router.push('/')
          }}>
            Login
          </Button>
          <Button onClick={() => setMustLogInDlg(false)}>
            Cancel
          </Button>

        </DialogActions>
      </Dialog>

      <Typography variant='h6' color='blue' textAlign={'center'} marginBottom={3} marginTop={2}>PRICING PLANS</Typography>
      <Typography variant='h4' textAlign={'center'} marginBottom={3}>Save money with our annual plans</Typography>
      <Box sx={{ alignContent: 'center', display: 'flex', spacing: 3, justifyContent: 'center' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label='Monthly' />
          <Tab label='Annual' />
        </Tabs>
        <BillingPortal customerId='sjbdkajsd'>
        </BillingPortal>
      </Box>
      <Grid container alignContent='center' display='flex' spacing={3} justifyContent={'center'}>
        <Grid item xs={12} md={6} lg={4}>
          <PlanCard data={activeTab == 0 ? basic : basicAnnual}
            isCurrentPlan={false}
            clickAction={handleClick} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <PlanCard data={activeTab == 0 ? business : businessAnnual}
            isCurrentPlan={false}
            clickAction={handleClick} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <PlanCard data={activeTab == 0 ? premium : premiumAnnual}
            isCurrentPlan={false}
            clickAction={handleClick} />
        </Grid>
      </Grid>
    </>


  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {

  const getUserInfo = async (): Promise<CognitoUserData | null> => {
    try {
      let userInfo = {};
      for (const [key, value] of Object.entries(req.cookies)) {
        // @ts-ignore
        userInfo[key.split(".").pop()] = value;
      }
      // @ts-ignore
      if (!userInfo.userData) {
        return null;
      }
      //@ts-ignore
      return userInfo;
    } catch (e) {
      return null;
    }
  };

  const userInfo = await getUserInfo();
  if (userInfo){

  }

  if (!Boolean(userInfo)){
    return {
      props: {
        logged: false
      },
      revalidate: 1
    }
  }
  
if (userInfo != null && userInfo != undefined){
  // console.log(userInfo)
  const userData = JSON.parse(userInfo.userData)
  // console.log('user info es',userData.Username)
  const data = await find(userData.Username)
  // console.log('data retrieved', data)
  return {
    props: {
      logged: true,
      profile: JSON.parse(JSON.stringify(data)) 
    }
  }
} else{
  return {
    props: {
      logged: true
    }
  }
}


}

export default Plans
