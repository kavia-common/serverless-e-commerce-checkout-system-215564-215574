import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CheckoutSuccess clears the cart and shows success state.
 */
export default function CheckoutSuccess({ onClearCart }) {
  useEffect(() => {
    onClearCart?.();
  }, [onClearCart]);

  return (
    <div className="hero" role="status" aria-live="polite">
      <div>
        <h1>Payment successful</h1>
        <p className="muted">Thank you for your order. A confirmation will be sent to your email.</p>
      </div>
      <Link to="/" className="icon-btn primary">Continue shopping</Link>
    </div>
  );
}
