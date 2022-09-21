
import Stripe from 'stripe'
import {update as updateUserInDB, find, deleteUserSubscription} from '../handlers/users'
import { findByCustomerId as findUserByCustomerId } from '../handlers/users';


function buildUserSubscription(
  subscription: Stripe.Subscription
): UserSubscription {
  const lineItem = subscription.items.data[0];
  const price = lineItem.price;

  return {
    id: subscription.id,
    priceId: price?.id,
    status : subscription.status,
    currency: lineItem.price.currency ?? null,
    interval: price?.recurring?.interval ?? null,
    intervalCount: price?.recurring?.interval_count ?? null,
    createdDate: subscription.created,
    periodStartsAt: subscription.current_period_start,
    periodEndsAt: subscription.current_period_end
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
   console.log(`the id is ${id} customer ${customerId}`)
    if(!id){
      return Error(`Could not find user for customerId ${customerId}`);
    }   
  try {
   await updateUserInDB({id: id},{subscriptionData: subscription})      
  } catch (error) {
    console.log(`Error saving user subscription data`, error)
    return error
  }
}

export async function onDeleteSubscription(customerId: string){
  try {
    await deleteUserSubscription({customerId: customerId})
  } catch (error) {
    console.error('Error deleting user subscription data')
    return error
  }

}

export async function onCheckoutCompleted(
    session: Stripe.Checkout.Session,
    subscription: Stripe.Subscription
  ) {
    const customerId = subscription.customer as string;    
    // status can either be paid ,unpaid or no_payment_required
    const status = subscription.status;
  
    const subscriptionData 
      = buildUserSubscription(subscription);    
    // use your DB methods to 
    // set user.subscription=subscriptionData  
    return await setUserSubscription(
      customerId,
      subscriptionData,
    );
  }

export async function onSubscriptionUpdated(subscription: Stripe.Subscription){
 const customerId = subscription.customer as string 
  const subscriptionData 
  = buildUserSubscription(subscription); 
  return await setUserSubscription(
    customerId,
    subscriptionData,
  );
}  



