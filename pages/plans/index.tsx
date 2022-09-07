import React from 'react'
import {useState, useEffect} from 'react'
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

type Props = {}

Amplify.configure(awsconfig);

const Plans = (props: Props) => {
  const [user, setUser] = useState(null);
  const [mustLogInDlg,setMustLogInDlg] = useState(false)
 //@ts-ignore
  const {userInfo} = useContext(Context)
  console.log(userInfo)
  
  useEffect(() => {
      Auth.currentAuthenticatedUser()
          .then(currentUser => setUser(currentUser.attributes.email))
          .catch(() => setUser(null));

      console.log(user)        
    }, []);

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


const click = (plan: string) =>{
  if (user === null){
    setMustLogInDlg(true)
  }
  console.log(plan)
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
      <Grid item>
      <PlanCard data={activeTab == 0 ?  basic : basicAnnual}
    isCurrentPlan={false}
    clickAction={click}/>
      </Grid>
      <Grid item>
      <PlanCard data={activeTab == 0 ? business : businessAnnual}
    isCurrentPlan={false}
    clickAction={click}/>
      </Grid>
      <Grid item>
      <PlanCard data={activeTab == 0 ? premium : premiumAnnual}
    isCurrentPlan={false}
    clickAction={click}/>
      </Grid>
    </Grid>
    </>


  )
}

export default Plans
