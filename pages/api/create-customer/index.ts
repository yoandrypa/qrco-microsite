import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import {update, find} from '../../../handlers/users'
import {PLAN_TEST_MODE_PRICES,} from '../../../consts'
//init stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-08-01',
  })


  async function createCustomerInStripe(email: string) {
  try {
    const params: Stripe.CustomerCreateParams = {
      email: email
    }
    const customer: Stripe.Customer = await stripe.customers.create(params)
    return customer.id
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error'
    return err as Error
  }
}

async function createCheckoutSession(
  customer_id: string,
   plan_type: string) {
  try {
     const session = stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: '',
          // For metered billing, do not pass quantity
          quantity: 1
        }
      ],
      success_url: `${DOMAIN}/plans/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/plans/`
     })
  } catch (error) {
    
  }
}

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if (req.method === 'POST') {
      if (!req.body.id || !req.body.email || !req.body.plan_type){
        return res.status(400).send('Missing parameters in request (email, plan_type and id)')
      } 
     
      const userData = await find(req.body.id)  

      if(!userData){
        return res.status(404).send('No user found for this id ' + req.body.id )
      }

      console.log('user data ',JSON.stringify(userData))  
         //creating new customer 
          if (!userData.plan_customer_id){ 
            const customer_id = await createCustomerInStripe(req.body.email);
            if (customer_id instanceof Error ){
               return res.status(500).json({error: true, message: customer_id.message})
            }
           const updateResult = await update({id: req.body.id}, {plan_customer_id: customer_id})
            if(!updateResult){
              return res.status(500).json({message: 'Could not save customer in database'})
            }
          }

          res.status(200)
      } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }



  }