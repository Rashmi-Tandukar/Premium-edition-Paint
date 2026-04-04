import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${cartOpen ? styles.backdropVisible : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Your Cart <span className={styles.count}>{cartCount}</span>
          </h3>
          <button className={styles.close} onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🛒</span>
            <p>Your cart is empty</p>
            <button className={styles.continueBtn} onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cartItems.map(item => (
                <div key={item.key} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.img} alt={item.name} onError={e => { e.target.style.display='none'; }} />
                    <div className={styles.itemImgFallback} style={{ display: 'none' }}>🎨</div>
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    {item.selectedSize && <p className={styles.itemSize}>Size: {item.selectedSize}</p>}
                    <p className={styles.itemPrice}>{item.price}</p>
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.qtyRow}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <button className={styles.remove} onClick={() => removeFromCart(item.key)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span className={styles.total}>
                  {cartTotal > 0 ? `£${cartTotal.toFixed(2)}` : cartItems[0]?.price ?? '—'}
                </span>
              </div>
              <button className={styles.checkoutBtn}>PROCEED TO CHECKOUT →</button>
              <button className={styles.continueBtn} onClick={() => setCartOpen(false)}>Continue Shopping</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
