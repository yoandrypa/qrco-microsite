//@ts-nocheck
import React from 'react'

import dynamic from "next/dynamic";
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'
// import DateCountdown from 'react-date-countdown-timer';
type Props = {
  dateFrom: string
}

const DateCountdown = dynamic(() => import("react-date-countdown-timer"), {
  ssr: false,
});

const TrialCountDown = (props: Props) => {
  const startingDate = new Date(props.dateFrom)
  const trialEnds = new Date()
  trialEnds.setDate(startingDate.getDate() + 14)



  if (typeof window !== "undefined") {
    if (trialEnds.getTime() <= new Date().getTime()){
      return (
        <Alert severity='error'>
          Ops, Your 14 days trial has ended. You can buy a plan to continue using the platform.
        </Alert>
      )
    } else {
      return (
        <>
        <Alert severity='info' sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>  
          You in free trial mode. Please use the options bellow in order to subscribe a plan. 
          Your free trial ends in:
        </Alert>
          <br/>
          <Box sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
          <DateCountdown noAnimate={false} mostSignificantFigure='day' dateFrom={props.dateFrom} dateTo={trialEnds.toString()} callback={()=>{alert('Your free trial ended')}}  />  

          </Box>
        </>
      )
    }
    // Client-side-only code
 
  } else {
    return <p>Loading count down...</p>
  }
  
}

export default TrialCountDown