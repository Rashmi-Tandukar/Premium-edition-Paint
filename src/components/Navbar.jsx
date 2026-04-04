import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const announcements = [
  '🏆 Price Match Guarantee — Found It Cheaper? We Beat It!',
  '⭐ Trusted By 50,000+ Customers Across The UK',
]

const trustItems = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.3 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    stat: 'FREE',
    label: 'Technical Advice',
    sub: 'Mon–Fri · 9AM–4PM',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    stat: 'NEXT DAY',
    label: 'Tracked Delivery',
    sub: '48hr option available',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    stat: 'BEAT IT',
    label: 'Price Match',
    sub: 'Found it cheaper? Done.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    stat: 'TRY IT',
    label: 'Colour Visualiser',
    sub: 'See it before you buy',
    link: '#',
  },
]

export default function Navbar() {
  const [annoIdx, setAnnoIdx] = useState(0)
  const [annoFade, setAnnoFade] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnnoFade(false)
      setTimeout(() => {
        setAnnoIdx(p => (p + 1) % announcements.length)
        setAnnoFade(true)
      }, 300)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>

        {/* ── Row 1: Announcement bar ── */}
        <div className={styles.annoRow}>
          <div className={styles.annoContent}>
            <div className={styles.annoLeft}>
              <span className={styles.annoPulse} />
              <span
                className={styles.annoText}
                style={{
                  opacity: annoFade ? 1 : 0,
                  transform: annoFade ? 'translateY(0)' : 'translateY(-6px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                {announcements[annoIdx]}
              </span>
            </div>
            <div className={styles.annoDots}>
              {announcements.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.annoDot} ${i === annoIdx ? styles.annoDotActive : ''}`}
                  onClick={() => { setAnnoFade(false); setTimeout(() => { setAnnoIdx(i); setAnnoFade(true) }, 300) }}
                />
              ))}
            </div>
            <a href="#" className={styles.subLink}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              SUBSCRIBE &amp; SAVE
            </a>
          </div>
        </div>

        {/* ── Row 2: Logo + Tagline + Actions ── */}
        <div className={styles.mainRow}>
          <div className="container">
            <div className={styles.mainInner}>

              {/* Logo */}
              <a href="#" className={styles.logo}>
                <div className={styles.logoMark}>
                  <img
                    src="/logo_final.png"
                    alt="Higgsfield Logo"
                    style={{ width: '64px', height: '64px', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoTop}>Premium Edition</span>
                  <div className={styles.logoBottom}>
                    <span className={styles.logoPaint}>PAINT</span>
                    <span className={styles.logoTag}>UK</span>
                  </div>
                </div>
              </a>

              {/* Centre tagline — replaces search bar */}
              <div className={styles.taglineBlock}>
                <p className={styles.taglineMain}>Britain's Most Trusted Paint Specialists</p>
                <p className={styles.taglineSub}>
                  <span className={styles.taglinePip}>50,000+ customers</span>
                  <span className={styles.taglineDot}>·</span>
                  <span className={styles.taglinePip}>Expert-matched colours</span>
                  <span className={styles.taglineDot}>·</span>
                  <span className={styles.taglinePip}>Trade &amp; retail</span>
                </p>
              </div>

              {/* Right actions */}
              <div className={styles.actions}>
                <a href="tel:01484972416" className={styles.phoneBlock}>
                  <div className={styles.phoneIconWrap}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.3 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className={styles.phoneTextWrap}>
                    <span className={styles.phoneLabel}>Call Us</span>
                    <span className={styles.phoneNum}>+44 7878 962923</span>
                  </div>
                </a>

                <div className={styles.iconGroup}>
                  <a href="#" className={styles.iconBtn} title="Help">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    <span>Help</span>
                  </a>

                  <a href="#" className={styles.iconBtn} title="Account">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Login</span>
                  </a>

                  <a href="#" className={styles.wishBtn} title="Wishlist">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span className={styles.badgeNum}>0</span>
                  </a>

                  <a href="#" className={styles.cartBtn} title="Cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span className={styles.cartBadge}>0</span>
                    <span className={styles.cartLabel}>Cart</span>
                  </a>
                </div>
              </div>

              {/* Mobile hamburger */}
              <button
                className={`${styles.mToggle} ${mobileOpen ? styles.mOpen : ''}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <span/><span/><span/>
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* ── Trust Strip ── */}
      <div className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustInner}>
            {trustItems.map((item, i) => (
              <div key={i} className={styles.trustCard} style={{ animationDelay: `${i * 80}ms` }}>
                <div className={styles.trustCardInner}>
                  <div className={styles.trustIconWrap}>
                    {item.icon}
                  </div>
                  <div className={styles.trustBody}>
                    <span className={styles.trustStat}>{item.stat}</span>
                    <strong className={styles.trustLabel}>{item.label}</strong>
                    <span className={styles.trustSub}>
                      {item.link ? <a href={item.link}>{item.sub}</a> : item.sub}
                    </span>
                  </div>
                </div>
                {i < trustItems.length - 1 && <div className={styles.trustCardDivider} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}