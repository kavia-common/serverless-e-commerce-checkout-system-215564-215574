import React, { useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Catalog from './pages/Catalog';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import CartDrawer from './components/CartDrawer';
import { useCartProvider } from './hooks/useCart';

/**
 * PUBLIC_INTERFACE
 * App is the main shell providing routing and cart drawer.
 */
function App() {
  const cart = useCartProvider(); // provides state and actions
  const [drawerOpen, setDrawerOpen] = useState(false);

  const itemCount = useMemo(
    () => cart.items.reduce((acc, it) => acc + it.quantity, 0),
    [cart.items]
  );

  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <nav className="navbar">
            <Link to="/" className="brand" aria-label="Go to catalog">
              <div className="brand-logo" aria-hidden="true" />
              <span>Ocean Shop</span>
              <span className="badge">Modern</span>
            </Link>
            <div className="nav-actions">
              <Link to="/" className="icon-btn" aria-label="Home">Home</Link>
              <button className="icon-btn primary" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
                Cart ({itemCount})
              </button>
            </div>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<Catalog onOpenCart={() => setDrawerOpen(true)} cart={cart} />} />
            <Route path="/success" element={<CheckoutSuccess onClearCart={cart.clearCart} />} />
            <Route path="/cancel" element={<CheckoutCancel />} />
          </Routes>
        </main>

        <CartDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          cart={cart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
