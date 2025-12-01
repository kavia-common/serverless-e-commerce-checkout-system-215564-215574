import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CheckoutCancel informs the user the checkout was canceled.
 */
export default function CheckoutCancel() {
  return (
    <div className="hero" role="status" aria-live="polite">
      <div>
        <h1>Checkout canceled</h1>
        <p className="muted">Your cart is intact. You can try again anytime.</p>
      </div>
      <Link to="/" className="icon-btn">Back to catalog</Link>
    </div>
  );
}
