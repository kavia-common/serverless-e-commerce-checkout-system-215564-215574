import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

/**
 * PUBLIC_INTERFACE
 * getStripe returns a singleton promise of Stripe initialized with publishable key.
 */
export function getStripe() {
  if (!stripePromise) {
    const key = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}
