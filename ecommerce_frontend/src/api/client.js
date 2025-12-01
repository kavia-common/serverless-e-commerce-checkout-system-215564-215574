const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

/**
 * PUBLIC_INTERFACE
 * getProducts fetches product catalog from backend.
 */
export async function getProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.items || []);
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * getInventory fetches inventory details for a product.
 * @param {string|number} productId
 */
export async function getInventory(productId) {
  if (!productId) return null;
  try {
    const res = await fetch(`${BASE_URL}/inventory/${productId}`, { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * PUBLIC_INTERFACE
 * createCheckoutSession posts a checkout session creation request.
 * items: [{ id, name, price, quantity }]
 * optional email parameter.
 */
export async function createCheckoutSession(items, email) {
  try {
    const res = await fetch(`${BASE_URL}/checkout/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, email }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Checkout failed (${res.status}): ${txt || 'Unknown error'}`);
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}
