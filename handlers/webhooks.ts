
import Stripe from 'stripe'
import {update as updateUserInDB, find, deleteUserSubscription} from '../handlers/users'
import { findByCustomerId as findUserByCustomerId } from '../handlers/users';


function buildUserSubscription(
  subscription: Stripe.Subscription,
  status: Stripe.Checkout.Session.PaymentStatus
): UserSubscription {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  return {
    id: subscription.id,
    priceId: price?.id,
    status,
    currency: lineItem.price.currency ?? null,
    interval: price?.recurring?.interval ?? null,
    intervalCount: price?.recurring?.interval_count ?? null,
    createdAt: subscription.created,
    periodStartsAt: subscription.current_period_start,
    periodEndsAt: subscription.current_period_end,
    trialStartsAt: subscription.trial_start ?? null,
    trialEndsAt: subscription.trial_end ?? null,
  };
}

/**
 * Set subscription data into de DB
 * @param customerId 
 * @param subscription 
 */
async function setUserSubscription(
    customerId: string,
    subscription: UserSubscription,
  ) {
   const {id} = await findUserByCustomerId(customerId) 
       
  try {
   await updateUserInDB({id: id},{subscriptionData: subscription})      
  } catch (error) {
    console.log('error saving user data')
  }
}

export async function onDeleteSubscription(customerId: string){
await deleteUserSubscription({customerId: customerId})
}

export async function onCheckoutCompleted(
    session: Stripe.Checkout.Session,
    subscription: Stripe.Subscription
  ) {
    const customerId = session.customer as string;    
    // status can either be paid ,unpaid or no_payment_required
    const status = session.payment_status;
  
    const subscriptionData 
      = buildUserSubscription(subscription, status);    
    // use your DB methods to 
    // set user.subscription=subscriptionData  
    return setUserSubscription(
      customerId,
      subscriptionData,
    );
  }



