import React from 'react';

/**
 * PUBLIC_INTERFACE
 * ProductCard displays a product and allows add-to-cart.
 */
export default function ProductCard({ product, onAdd, loading }) {
  const price = typeof product.price === 'number' ? (product.price / 100).toFixed(2) : '—';

  return (
    <div className="card" role="region" aria-label={`Product ${product.name || 'Item'}`}>
      <div className="card-media">
        <div className="placeholder" aria-hidden="true">🛍️</div>
      </div>
      <div className="card-body">
        <div className="card-title">{product.name || 'Product name'}</div>
        <div className="card-desc">{product.description || 'High quality product with elegant design.'}</div>
        <div className="card-foot">
          <div className="price">${price}</div>
          <button className="add-btn" onClick={() => onAdd(product)} disabled={loading}>
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
