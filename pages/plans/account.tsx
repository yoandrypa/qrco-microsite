

import React, {useContext} from 'react'
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import BillingPortal from "../../components/billing/BillingPortal"
import Context from '../../components/context/Context'
import Grid from '@mui/material/Grid'
import {find} from '../../handlers/users'


type Props = {
  logged: boolean,
  profile?: {customerId?: string},
  planType?: string
}

 const AccountPage = (props: Props) => {
  // @ts-ignore
  const { userInfo } = useContext(Context)
  const router = useRouter();
  const id = router.query["session_id"];
 console.log(id)
 console.log(props.logged, props.profile)

 if (!!props.logged || !!props.profile?.customerId){
  return (
    <Typography >
      No account available!
    </Typography>
  )
 }
  return (
    <>
    <Typography variant='h4'>
      Account details
    </Typography>
    <Divider></Divider>
    <Paper>
      <Typography padding={2}>
        The Qr Link uses Stripe as partner to ensure a better experience managing your billings. 
        use the options bellow to make changes on your plan or payment information.
      </Typography>
      <Grid container spacing={2}>
        <Grid item padding={2} marginLeft={2}>
        <BillingPortal customerId={props.profile?.customerId || ''} />
        </Grid>
        <Grid item padding={2}>
        <Button variant='outlined'>
          Home Page
        </Button>
        </Grid>
        <Grid item>
      {/* <Button  variant='outlined'>Later</Button> */}
       
        </Grid>
      </Grid>
     
    </Paper>
    </>
  )
}

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

  if (!userInfo?.userData){
    return {
      props: {
        logged: false
      }
    }
  } else {
   console.log(userInfo)
   //@ts-ignore
  const userData = JSON.parse(userInfo.userData as string)
  const userId = userData.UserAttributes[0].Value;
  console.log('user infoData es',userData)
  const data: object = await find(userId) 
  return {
    props: {
      logged: true,
      profile: JSON.parse(JSON.stringify(data)) 
    }
  }
} 


}

export default AccountPage