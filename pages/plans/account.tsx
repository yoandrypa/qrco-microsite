

import React, {useContext} from 'react'
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import BillingPortal from "../../components/billing/BillingPortal"
import Context from '../../components/context/Context'
import Grid from '@mui/material/Grid'
type Props = {}

 const AccountPage = (props: Props) => {
  // @ts-ignore
  const { userInfo } = useContext(Context)
  const router = useRouter();
  const id = router.query["session_id"];
 console.log(id)
 console.log(userInfo)
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
      <Grid spacing={2}>
        <Grid item>
        <BillingPortal customerId='' />
        </Grid>
        <Grid item>
      {/* <Button  variant='outlined'>Later</Button> */}
       
        </Grid>
      </Grid>
     
    </Paper>
    </>
  )
}

export default AccountPage