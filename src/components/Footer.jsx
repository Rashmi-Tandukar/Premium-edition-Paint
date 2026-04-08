import styles from './Footer.module.css'

const cols = {
  'Find Information': ['FAQ\'s', 'Delivery Information', 'Returns Policy', 'Track Your Order', 'Paint Calculator', 'Colour Matching', 'Contact Us'],
  'Paint Categories': ['Interior Paints', 'Exterior Paints', 'Wood, Furniture & Garden'],
  'About Us': ['About Premium Edition Paint', 'Our Sustainability', 'Press & Media', 'Careers', 'Affiliate Programme'],
  'Find Us Online': ['Facebook', 'Instagram', 'YouTube', 'Pinterest', 'TikTok'],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand col */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="6" fill="#e02020"/>
                  <path d="M10 30 L20 8 L30 30" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 23 L26 23" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                <div className={styles.logoTxt}>
                  <span className={styles.lP}>PREMIUM EDITION</span>
                  <span className={styles.lO}>PAINT</span>
                </div>
              </div>
              <p className={styles.tagline}>The UK's leading online paint retailer. Professional-grade products at trade prices — delivered to your door.</p>
              <div className={styles.contact}>
                <span>📞+44 7878 962923</span>
                <span>✉️ premiumpaint195@hotmail.com</span>
                <span>🕐 Mon–Fri: 9am – 5pm</span>
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(cols).map(([h, links]) => (
              <div key={h} className={styles.col}>
                <h4 className={styles.colHead}>{h}</h4>
                <ul className={styles.list}>
                  {links.map(l => (
                    <li key={l} className={styles.lnk}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© 2025 Premium Edition Paint. All rights reserved. Registered in England &amp; Wales.</p>
            <div className={styles.legal}>
              <span>Privacy Policy</span>
              <span>Terms &amp; Conditions</span>
              <span>Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}