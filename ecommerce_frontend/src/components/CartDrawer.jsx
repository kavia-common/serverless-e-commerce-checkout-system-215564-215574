import React, { useState } from 'react';
import { createCheckoutSession } from '../api/client';
import { getStripe } from '../stripe/stripe';

/**
 * PUBLIC_INTERFACE
 * CartDrawer shows cart items and performs checkout.
 */
export default function CartDrawer({ open, onClose, cart }) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const beginCheckout = async () => {
    setError('');
    if (!cart.items.length) return;
    setProcessing(true);
    try {
      const payloadItems = cart.items.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      }));
      const session = await createCheckoutSession(payloadItems);
      if (!session) {
        throw new Error('No session returned from backend.');
      }
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to initialize. Check REACT_APP_STRIPE_PUBLISHABLE_KEY.');
      }
      // Prefer sessionId if given, otherwise use URL
      if (session.id) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) throw error;
      } else if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Backend response missing session id/url.');
      }
    } catch (err) {
      setError(err.message || 'Checkout failed.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Cart">
      <div className="drawer-header">
        <div className="drawer-title">Your Cart</div>
        <button className="icon-btn" onClick={onClose} aria-label="Close cart">Close</button>
      </div>
      <div className="drawer-body">
        {!cart.items.length && <div className="muted">Your cart is empty.</div>}
        {cart.items.map(item => (
          <div key={item.id} className="drawer-item">
            <div>
              <div style={{ fontWeight: 700 }}>{item.name}</div>
              <div className="muted">${(item.price / 100).toFixed(2)} each</div>
            </div>
            <div style={{ display: 'grid', gap: 8, justifyItems: 'end' }}>
              <div className="qty-controls" aria-label="Quantity controls">
                <button onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))} aria-label="Decrease quantity">-</button>
                <div style={{ padding: '6px 10px', minWidth: 24, textAlign: 'center' }}>{item.quantity}</div>
                <button onClick={() => cart.updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="icon-btn" onClick={() => cart.removeItem(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="drawer-footer">
        <div className="muted">Subtotal: <strong>${(cart.subtotal / 100).toFixed(2)}</strong></div>
        {error && <div style={{ color: '#B91C1C' }}>{error}</div>}
        <button className="checkout-btn" onClick={beginCheckout} disabled={processing || !cart.items.length}>
          {processing ? 'Redirecting…' : 'Checkout'}
        </button>
      </div>
    </aside>
  );
}
