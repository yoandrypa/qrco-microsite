import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

<<<<<<< HEAD
import {User} from '../../../models/user'

=======
>>>>>>> 06742ef (create customer endpoint)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-08-01',
  })

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {

    if (req.method === 'POST') {
<<<<<<< HEAD
try {
  const users = User

 const results =  await users.all().exec((error: any, results: any) => {
    if (error) {
        console.error(error);
    } else {
        console.log("results are ", results);
        // [ Document { name: 'Will', breed: 'Terrier', id: 1 },
        //   lastKey: undefined,
        //   count: 1,
        //   queriedCount: 2,
        //   timesQueried: 1 ]
        console.log(results[0]); // { name: 'Will', breed: 'Terrier', id: 1 }
        console.log(results.count); // 1
        console.log(Array.isArray(results)); // true
        console.log(results.scannedCount); // 2
    }
});
  console.log(users.toJSON())
} catch (error) {
  
}
=======
>>>>>>> 06742ef (create customer endpoint)

        try {
            //TODO validate params
            const params: Stripe.CustomerCreateParams = {
                email: req.body.email
            }
            const customer: Stripe.Customer =
              await stripe.customers.create(params)
      
            res.status(200).json(customer)
          } catch (err) {
            const errorMessage =
              err instanceof Error ? err.message : 'Internal server error'
            res.status(500).json({ statusCode: 500, message: errorMessage })
          }

    } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
  }