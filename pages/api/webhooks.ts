// import { buffer } from 'micro'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import getRawBody from 'raw-body';
import { onCheckoutCompleted ,onDeleteSubscription } from '../../handlers/webhooks';

// disable body parser to receive the raw body string. The raw body
// is fundamental to verify that the request is genuine
export const config = {
  api: {
    bodyParser: false,
  },
};


const stripe = new Stripe(process.env.REACT_STRIPE_SECRET_KEY || 'sk_test_51Ksb3LCHh3XhfaZr2tgzaQKAQtuTF9vRtgdXBS7X2rAaPC6FNoLQ3hyPFVmlnRhsif0FDdbi5cdgEh7Y1Wt9Umo900w9YPUGo6', {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-08-01',
})

type ResponseData = {

}

const webhookSecret: string = process.env.REACT_STRIPE_WEBHOOK_SECRET!

export enum StripeWebhooks {
  AsyncPaymentSuccess = 'checkout.session.async_payment_succeeded',
  Completed = 'checkout.session.completed',
  PaymentFailed = 'checkout.session.async_payment_failed',
  SubscriptionDeleted = 'customer.subscription.deleted',
  SubscriptionUpdated = 'customer.subscription.updated',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature']!
    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      // On error, log and return the error message.
      if (err! instanceof Error) console.log(err)
      console.log(`Error message: ${errorMessage}`)
      res.status(400).send(`Webhook Error: ${errorMessage}`)
      return
    }

    // Successfully constructed event.
    console.log('Success constructing event:', event.id)

    switch (event.type) {
      case StripeWebhooks.Completed: {
        const session = event.data.object as Stripe.Checkout.Session;
        const subscriptionId = session.subscription as string;

        const subscription = await stripe.subscriptions.retrieve(
          subscriptionId
        );

        await onCheckoutCompleted(session, subscription);
        break;
      }

      // case StripeWebhooks.AsyncPaymentSuccess: {
      //   const session = event.data.object as Stripe.Checkout.Session;
      //   const customerId = session.customer as string;

      //   await activatePendingSubscription(customerId);

      //   break;
      // }

      case StripeWebhooks.SubscriptionDeleted: {
        const subscription = event.data.object as Stripe.Subscription;
        //casting to string
        await onDeleteSubscription(subscription.customer as string);

        break;
      }

      case StripeWebhooks.SubscriptionUpdated: {
        const subscription = event.data.object as Stripe.Subscription;

        //await onSubscriptionUpdated(subscription);

        break;
      }

      case StripeWebhooks.PaymentFailed: {
        const session = event.data.object as Stripe.Checkout.Session;

        // TODO: handle this properly
       // onPaymentFailed(session);

        break;
      }
    }


    // Return a response to acknowledge receipt of the event.
    res.status(200).json({ success: true, message: "Payload decoded successfully" })

  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }

}
