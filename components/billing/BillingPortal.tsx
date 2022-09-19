import React from 'react'
import { Button } from '@aws-amplify/ui-react'

type BillingPortalProps = {
    children: React.ReactNode,
    customerId:string
}

function BillingPortal(props: BillingPortalProps) {
  return (
    <form method="POST" action={`/api/billing-portal/`}>
    <input type={'hidden'} name={'customerId'} value={props.customerId} />

    <Button color={'secondary'} >
      {props.children}
    </Button>
  </form>
  )
}

export default BillingPortal