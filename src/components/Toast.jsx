import { useCart } from '../context/CartContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { toasts } = useCart();
  if (!toasts.length) return null;
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={styles.toast}>{t.msg}</div>
      ))}
    </div>
  );
}
