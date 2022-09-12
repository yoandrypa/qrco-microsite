import React from 'react'
import {useState, useEffect, useContext} from 'react'
import PlanCard from '../../components/plans/plancard'
import Grid from '@mui/material/Grid'
import  Typography  from '@mui/material/Typography'
import  Tab from '@mui/material/Tab'
import  Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../libs/aws/aws-exports'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Dialog from '@mui/material/Dialog'
import { useRouter } from 'next/router';
import Context from '../../components/context/Context'
import axios, { Axios } from 'axios'

type Props = {}

Amplify.configure(awsconfig);

const Plans = (props: Props) => {
  interface UserAuthData {
    username: string; 
    id: string;
  }

  const [user, setUser] = useState<any>(null);
  const [mustLogInDlg,setMustLogInDlg] = useState(false)
  // @ts-ignore
  const {userInfo} = useContext(Context)
  const API = axios.create({
    baseURL:  process.env.REACT_APP_DEFAULT_DOMAIN === 'localhost:3000' ? 
    `http://${process.env.REACT_APP_DEFAULT_DOMAIN}` :
    `https://${process.env.REACT_APP_DEFAULT_DOMAIN}`
 
  });


  
  useEffect(() => {
      // Auth.currentAuthenticatedUser()
      //     .then(currentUser => setUser(currentUser.attributes.email))
      //     .catch(() => setUser(null));

      // console.log(user)       
       //@ts-ignore
  (userInfo != null && userInfo != undefined) && setUser(userInfo)
  console.log("Current user data", userInfo)
    }, [userInfo]);



const [activeTab, setActiveTab] = useState(0);
const router = useRouter()

  const basic = {
    title:"Basic Account",
    description:"For small teams or group who need to build a website",
    buttonText: "Subscribe",
    period: "Per month & subscription yearly",
    highlighted: false,
    priceAmount: "$9",
    features:[
      "Up to 5 Dinamic QR Codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],

  }
  const basicAnnual = {
    title:"Basic Account",
    description:"For small teams or group who need to build a website",
    buttonText: "Subscribe",
    period: "Save two months",
    highlighted: false,
    priceAmount: "$90",
    features:[
      "Up to 5 Dinamic QR Codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],

  }

  const business = {
    title:"Business Account",
    description:"For medium team or grup who need to build a website.",
    buttonText: "Subscribe",
    period: "Save two months",
    highlighted: false,
    priceAmount: "$15",
    features:[
      "Up to 100 Dinamic QR Codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],    
  }
  const businessAnnual = {
    title:"Business Account",
    description:"For medium team or grup who need to build a website.",
    buttonText: "Subscribe",
    period: "Save two months",
    highlighted: false,
    priceAmount: "$150",
    features:[
      "Up to 100 Dinamic QR Codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],

  }

  const premium = {
    title:"Premium Account",
    description:"For large teams or group who need to build a website.",
    buttonText: "Subscribe",
    period: "Per month & subscription yearly",
    highlighted: true,
    priceAmount: "$45",
    features:[
      "Unlimited dynamic QR codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],
  }
  const premiumAnnual = {
    title:"Premium Account",
    description:"For large teams or group who need to build a website.",
    buttonText: "Subscribe",
    period: "Per month & subscription yearly",
    highlighted: true,
    priceAmount: "$360",
    features:[
      "Unlimited dynamic QR codes",
      "Unlimited statc QR Codes",
      "Unlimited scans"
    ],
  }


const handleClick = (plan: string) =>{
  if (user === null){
    setMustLogInDlg(true)
  } else {
    const response = API.post(`/api/create-customer`,{
              id: user.attributes.sub,
              email: user.attributes.email,
              plan_type: plan
            })
console.log(response)
//@ts-ignore
if (response.error || response.status! > 200 ) {
    console.log('error')
    return
 }     
  }
}

const handleTabChange = (event: React.SyntheticEvent, value:number)=>{
setActiveTab(value)
}
  return (
    <>
    <Dialog open={mustLogInDlg}>
      <DialogContent>
       In order to buy a plan, you must login first!
      </DialogContent>
      <DialogActions>
        <Button onClick={async ()=>{
         await router.push('/')
        }}>
          Login
        </Button>
        <Button onClick={()=> setMustLogInDlg(false)}>
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
     <Typography variant='h6' color='blue' textAlign={'center'} marginBottom={3} marginTop={2}>PRICING PLANS</Typography>
     <Typography variant='h4' textAlign={'center'} marginBottom={3}>Save money with our annual plans</Typography>
     <Box sx={{alignContent:'center', display:'flex' ,spacing:3, justifyContent: 'center'}}>
     <Tabs value={activeTab} onChange={handleTabChange}>
     <Tab  label='Monthly'/>
     <Tab label='Annual'/>
     </Tabs>
     </Box>
    <Grid container alignContent='center' display='flex' spacing={3} justifyContent={'center'}>
      <Grid item xs={12} md={6} lg={4}>
      <PlanCard data={activeTab == 0 ?  basic : basicAnnual}  
    isCurrentPlan={false} 
    clickAction={handleClick}/>
      </Grid>
      <Grid item xs={12} md={6} lg={4}> 
      <PlanCard data={activeTab == 0 ? business : businessAnnual} 
    isCurrentPlan={false} 
    clickAction={handleClick}/>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
      <PlanCard data={activeTab == 0 ? premium : premiumAnnual} 
    isCurrentPlan={false} 
    clickAction={handleClick}/>
      </Grid>
    </Grid>
    </>


  )
}

export default Plans
