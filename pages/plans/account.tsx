

import React from 'react'
import Paper from '@mui/material/Paper'
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography"
type Props = {}

 const AccountPage = (props: Props) => {
  const router = useRouter();
  const id = router.query["session_id"];
 console.log(id)
  return (
    <>
    <Typography variant='h4'>
      Account details
    </Typography>
    
    </>
  )
}

export default AccountPage