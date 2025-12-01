import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/client';

/**
 * PUBLIC_INTERFACE
 * Catalog page fetches and displays products in a grid.
 */
export default function Catalog({ cart, onOpenCart }) {
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      const items = await getProducts();
      if (active) {
        setProducts(items?.length ? items : getFallbackProducts());
        setLoading(false);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const onAdd = (p) => {
    setAddingId(p.id);
    cart.addItem({ id: p.id, name: p.name, price: p.price });
    setTimeout(() => {
      setAddingId(null);
      onOpenCart?.();
    }, 250);
  };

  return (
    <div>
      <section className="hero">
        <div>
          <h1>Explore Products</h1>
          <p>Premium items with modern aesthetics. Blue & amber accents throughout.</p>
        </div>
        <div className="badge">Ocean Professional</div>
      </section>

      <section className="grid" aria-live="polite">
        {loading ? (
          <div className="muted">Loading products…</div>
        ) : (
          products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={onAdd}
              loading={addingId === p.id}
            />
          ))
        )}
      </section>
    </div>
  );
}

function getFallbackProducts() {
  // Fallback simple list using cents for price
  return [
    { id: 'sku_ocean_1', name: 'Ocean Tee', description: 'Soft cotton tee.', price: 2500 },
    { id: 'sku_ocean_2', name: 'Amber Mug', description: 'Ceramic mug.', price: 1800 },
    { id: 'sku_ocean_3', name: 'Blue Notebook', description: 'Dot grid journal.', price: 1500 },
    { id: 'sku_ocean_4', name: 'Wave Hoodie', description: 'Cozy and warm.', price: 5400 },
    { id: 'sku_ocean_5', name: 'Sunset Cap', description: 'Adjustable fit.', price: 2200 },
    { id: 'sku_ocean_6', name: 'Glass Bottle', description: 'Eco hydration.', price: 3000 },
    { id: 'sku_ocean_7', name: 'Minimal Backpack', description: 'Daily carry.', price: 7900 },
    { id: 'sku_ocean_8', name: 'Sticker Pack', description: 'Ocean vibes.', price: 900 },
  ];
}
