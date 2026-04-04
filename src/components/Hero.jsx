import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

function PainterIllustration() {
  return (
    <svg
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060e32" />
          <stop offset="100%" stopColor="#0a1a5c" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#FFD700" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="skin1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4956A" />
          <stop offset="100%" stopColor="#B8784A" />
        </linearGradient>
        <linearGradient id="skin2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8825A" />
          <stop offset="100%" stopColor="#A8653A" />
        </linearGradient>
        <linearGradient id="drip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#b8860b" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="canLabel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#e6c200" />
        </linearGradient>
        <linearGradient id="pole" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a2f6e" />
          <stop offset="50%" stopColor="#2a4080" />
          <stop offset="100%" stopColor="#1a2f6e" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="600" fill="url(#bg)" />
      <rect x="0" y="490" width="900" height="110" fill="#050c28" />
      <rect x="0" y="487" width="900" height="6" fill="#0c1b50" />
      <ellipse cx="420" cy="520" rx="340" ry="28" fill="#FFD700" fillOpacity="0.04" />

      {/* Painted wall area – gold */}
      <rect x="0" y="0" width="520" height="490" fill="url(#wallGrad)" />
      <rect x="0" y="60" width="400" height="58" fill="#FFD700" fillOpacity="0.08" rx="2" />
      <rect x="0" y="140" width="380" height="58" fill="#FFD700" fillOpacity="0.07" rx="2" />
      <rect x="0" y="220" width="360" height="58" fill="#FFD700" fillOpacity="0.06" rx="2" />
      <rect x="0" y="300" width="340" height="58" fill="#FFD700" fillOpacity="0.055" rx="2" />

      {/* Scaffold platform */}
      <rect x="30" y="310" width="480" height="14" rx="3" fill="url(#pole)" />
      <rect x="30" y="310" width="480" height="14" rx="3" fill="none" stroke="#FFD700" strokeOpacity="0.15" strokeWidth="1" />
      <line x1="80" y1="310" x2="80" y2="324" stroke="#0a1540" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="180" y1="310" x2="180" y2="324" stroke="#0a1540" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="280" y1="310" x2="280" y2="324" stroke="#0a1540" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="380" y1="310" x2="380" y2="324" stroke="#0a1540" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="460" y1="310" x2="460" y2="324" stroke="#0a1540" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Scaffold poles */}
      <rect x="42" y="200" width="10" height="292" rx="3" fill="url(#pole)" />
      <rect x="486" y="200" width="10" height="292" rx="3" fill="url(#pole)" />
      <line x1="52" y1="320" x2="486" y2="200" stroke="#1a2f6e" strokeWidth="3" strokeOpacity="0.7" />
      <line x1="52" y1="200" x2="486" y2="320" stroke="#1a2f6e" strokeWidth="3" strokeOpacity="0.4" />

      {/* ─── PAINTER 1: on scaffold with roller ─── */}
      {/* Legs */}
      <rect x="155" y="308" width="22" height="8" rx="3" fill="#0d1f6e" />
      <rect x="181" y="308" width="22" height="8" rx="3" fill="#0d1f6e" />
      <ellipse cx="166" cy="316" rx="13" ry="6" fill="#1a1a3a" />
      <ellipse cx="192" cy="316" rx="13" ry="6" fill="#1a1a3a" />
      {/* Body overalls */}
      <rect x="155" y="230" width="54" height="82" rx="8" fill="#0d1f6e" />
      <rect x="165" y="230" width="34" height="26" rx="4" fill="#0a1858" />
      <line x1="170" y1="230" x2="166" y2="218" stroke="#162478" strokeWidth="4" strokeLinecap="round" />
      <line x1="193" y1="230" x2="196" y2="218" stroke="#162478" strokeWidth="4" strokeLinecap="round" />
      {/* Shirt */}
      <rect x="162" y="218" width="40" height="16" rx="4" fill="#FFD700" fillOpacity="0.9" />
      {/* Head */}
      <ellipse cx="183" cy="204" rx="19" ry="20" fill="url(#skin1)" />
      <ellipse cx="183" cy="192" rx="19" ry="10" fill="#2a1a0a" />
      <ellipse cx="176" cy="204" rx="2.5" ry="3" fill="#1a0e05" />
      <path d="M172 212 Q183 217 192 212" stroke="#1a0e05" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Hard hat */}
      <ellipse cx="183" cy="191" rx="22" ry="7" fill="#FFD700" />
      <rect x="164" y="184" width="38" height="9" rx="4" fill="#FFD700" />
      <rect x="163" y="189" width="40" height="4" rx="2" fill="#e6c200" />
      {/* Arm with roller */}
      <line x1="163" y1="245" x2="110" y2="248" stroke="#D4956A" strokeWidth="10" strokeLinecap="round" />
      <line x1="110" y1="248" x2="90" y2="248" stroke="#1a2050" strokeWidth="8" strokeLinecap="round" />
      <rect x="64" y="235" width="28" height="26" rx="6" fill="#e6c200" />
      <rect x="63" y="233" width="30" height="7" rx="3" fill="#FFD700" />
      {/* Paint on wall from roller */}
      <rect x="0" y="233" width="64" height="24" fill="#FFD700" fillOpacity="0.55" rx="2" />
      {/* Drips */}
      <path d="M30 258 Q28 270 32 285" stroke="url(#drip)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="32" cy="287" rx="4" ry="5" fill="#FFD700" fillOpacity="0.7" />
      <path d="M55 261 Q53 278 57 298" stroke="url(#drip)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="57" cy="300" rx="3" ry="4" fill="#FFD700" fillOpacity="0.6" />

      {/* ─── PAINTER 2: standing with can & brush ─── */}
      {/* Legs */}
      <rect x="348" y="380" width="24" height="112" rx="6" fill="#0d1f6e" />
      <rect x="376" y="380" width="24" height="112" rx="6" fill="#0d1f6e" />
      <ellipse cx="360" cy="492" rx="16" ry="7" fill="#1a1a3a" />
      <ellipse cx="388" cy="492" rx="16" ry="7" fill="#1a1a3a" />
      {/* Body */}
      <rect x="340" y="275" width="70" height="112" rx="10" fill="#162478" />
      <rect x="346" y="330" width="22" height="18" rx="3" fill="#0d1858" />
      <rect x="382" y="330" width="22" height="18" rx="3" fill="#0d1858" />
      {/* Logo patch */}
      <rect x="358" y="286" width="34" height="22" rx="3" fill="#FFD700" fillOpacity="0.9" />
      <text x="375" y="302" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#07102a" fontFamily="Montserrat, sans-serif">PEP</text>
      {/* Head */}
      <ellipse cx="375" cy="255" rx="22" ry="23" fill="url(#skin2)" />
      <ellipse cx="375" cy="240" rx="22" ry="11" fill="#1a0e05" />
      <ellipse cx="367" cy="255" rx="2.8" ry="3.2" fill="#1a0e05" />
      <ellipse cx="381" cy="255" rx="2.8" ry="3.2" fill="#1a0e05" />
      <path d="M364 265 Q375 272 386 265" stroke="#1a0e05" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M363 248 Q368 245 373 248" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M378 248 Q383 245 388 248" stroke="#2a1a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Hard hat */}
      <ellipse cx="375" cy="240" rx="26" ry="8" fill="#FFD700" />
      <rect x="351" y="232" width="48" height="10" rx="5" fill="#FFD700" />
      <rect x="350" y="239" width="50" height="5" rx="2.5" fill="#e6c200" />
      {/* Right arm – paint can */}
      <line x1="340" y1="300" x2="314" y2="358" stroke="#C8825A" strokeWidth="11" strokeLinecap="round" />
      <rect x="296" y="354" width="38" height="42" rx="5" fill="#0d1f6e" />
      <rect x="296" y="354" width="38" height="12" rx="5" fill="#0a1858" />
      <rect x="298" y="368" width="34" height="22" rx="2" fill="url(#canLabel)" />
      <text x="315" y="383" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#07102a" fontFamily="Montserrat, sans-serif">PAINT</text>
      <path d="M302 354 Q315 342 328 354" stroke="#2a4080" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Can drip */}
      <path d="M312 396 Q310 408 314 422" stroke="url(#drip)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="314" cy="424" rx="4" ry="5" fill="#FFD700" fillOpacity="0.75" />
      {/* Left arm – brush */}
      <line x1="410" y1="295" x2="440" y2="248" stroke="#C8825A" strokeWidth="11" strokeLinecap="round" />
      <line x1="440" y1="248" x2="456" y2="226" stroke="#8B5e3c" strokeWidth="6" strokeLinecap="round" />
      <rect x="449" y="210" width="18" height="18" rx="2" fill="#FFD700" fillOpacity="0.9" />
      <line x1="452" y1="210" x2="449" y2="198" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.7" />
      <line x1="458" y1="210" x2="456" y2="197" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.7" />
      <line x1="464" y1="210" x2="463" y2="197" stroke="#FFD700" strokeWidth="2" strokeOpacity="0.7" />
      {/* Brush stroke on wall */}
      <path d="M467 200 Q490 185 470 170 Q448 158 465 145" stroke="#FFD700" strokeWidth="8" fill="none" strokeLinecap="round" strokeOpacity="0.65" />

      {/* Floor paint splatter */}
      <ellipse cx="200" cy="505" rx="11" ry="5" fill="#FFD700" fillOpacity="0.4" />
      <ellipse cx="240" cy="508" rx="7" ry="3" fill="#FFD700" fillOpacity="0.36" />
      <ellipse cx="260" cy="503" rx="9" ry="4" fill="#FFD700" fillOpacity="0.32" />
      <ellipse cx="185" cy="510" rx="5" ry="2.5" fill="#FFD700" fillOpacity="0.28" />
      <ellipse cx="310" cy="507" rx="8" ry="3.5" fill="#FFD700" fillOpacity="0.24" />
      <ellipse cx="355" cy="510" rx="5" ry="2.5" fill="#FFD700" fillOpacity="0.2" />

      {/* Right – unpainted area */}
      <rect x="520" y="0" width="380" height="490" fill="#050c28" fillOpacity="0.5" />

      {/* Window */}
      <rect x="620" y="80" width="160" height="200" rx="4" fill="none" stroke="#1a2f7e" strokeWidth="3" />
      <rect x="624" y="84" width="152" height="192" rx="2" fill="#0a1540" fillOpacity="0.6" />
      <line x1="700" y1="84" x2="700" y2="276" stroke="#1a2f7e" strokeWidth="2.5" />
      <line x1="624" y1="180" x2="776" y2="180" stroke="#1a2f7e" strokeWidth="2.5" />
      <rect x="625" y="85" width="74" height="94" rx="2" fill="#FFD700" fillOpacity="0.06" />

      {/* Paint supplies */}
      <rect x="665" y="440" width="52" height="52" rx="6" fill="#0d1f6e" />
      <rect x="665" y="440" width="52" height="14" rx="6" fill="#0a1858" />
      <rect x="668" y="455" width="46" height="30" rx="2" fill="url(#canLabel)" />
      <text x="691" y="474" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#07102a" fontFamily="Montserrat, sans-serif">GOLD</text>
      <path d="M671 440 Q691 428 711 440" stroke="#2a4080" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <ellipse cx="760" cy="484" rx="44" ry="10" fill="#1a2f6e" />
      <ellipse cx="760" cy="482" rx="38" ry="7" fill="#FFD700" fillOpacity="0.55" />
      <line x1="696" y1="435" x2="700" y2="492" stroke="#8B5e3c" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
      <rect x="560" y="468" width="60" height="14" rx="4" fill="#8B5e3c" />
      <rect x="556" y="462" width="22" height="26" rx="5" fill="#FFD700" fillOpacity="0.8" />

      {/* Background gold accent dots */}
      <circle cx="720" cy="160" r="12" fill="#FFD700" fillOpacity="0.08" />
      <circle cx="740" cy="350" r="8" fill="#FFD700" fillOpacity="0.06" />
      <circle cx="850" cy="240" r="10" fill="#FFD700" fillOpacity="0.05" />
      <circle cx="590" cy="420" r="7" fill="#FFD700" fillOpacity="0.07" />
      <circle cx="820" cy="130" r="6" fill="#FFD700" fillOpacity="0.06" />
      <circle cx="100" cy="120" r="1.5" fill="#FFD700" fillOpacity="0.3" />
      <circle cx="380" cy="80" r="1.5" fill="#FFD700" fillOpacity="0.4" />
      <circle cx="520" cy="200" r="1.5" fill="#FFD700" fillOpacity="0.3" />
      <circle cx="640" cy="380" r="1.5" fill="#FFD700" fillOpacity="0.3" />
      <circle cx="770" cy="70" r="1.5" fill="#FFD700" fillOpacity="0.4" />
      <circle cx="860" cy="310" r="1.5" fill="#FFD700" fillOpacity="0.35" />
    </svg>
  )
}

export default function Hero() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  const customers = useCountUp(50000, 2000, statsVisible)
  const countries = useCountUp(40, 1200, statsVisible)
  const products = useCountUp(500, 1600, statsVisible)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  const fmt = (n) => n >= 1000 ? Math.floor(n / 1000) + 'K+' : n + '+'

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <img
          src="/hero-bg.jpeg"
          alt="Two paint professionals working with premium paints"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            position: 'absolute',
            inset: 0,
          }}
        />
      </div>

      <div className={styles.overlayGradient}></div>
      <div className={styles.accentLine}></div>

      <div className={styles.heroLayout}>
        <div className={styles.centerPane}>
          <div className={styles.brandBadge}>
            <span className={styles.badgeStar}>★</span>
            UK&apos;S PREMIUM PAINT SUPPLIER
          </div>
          <h1 className={styles.heading}>
            <span className={styles.headLine1}>Premium</span>
            <span className={styles.headLine2}>Edition</span>
            <span className={styles.headLine3}>Paint</span>
          </h1>
          <p className={styles.slogan}>Where Colour Meets Durability</p>
          <p className={styles.sub}>
            Professional-quality interior &amp; exterior paints trusted by 50,000+ decorators and DIY enthusiasts across the UK. Same-day dispatch on thousands of products.
          </p>
          <div className={styles.statsRow} ref={statsRef}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{statsVisible ? fmt(customers) : '50K+'}</span>
              <span className={styles.statLabel}>Customers</span>
            </div>
            <div className={styles.statDiv}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{statsVisible ? fmt(countries) : '40+'}</span>
              <span className={styles.statLabel}>Countries</span>
            </div>
            <div className={styles.statDiv}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{statsVisible ? fmt(products) : '500+'}</span>
              <span className={styles.statLabel}>Products</span>
            </div>
            <div className={styles.statDiv}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>4.9★</span>
              <span className={styles.statLabel}>Avg. Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustInner}>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
              <span><strong>HIGHEST RATED</strong><br />Products in the Market</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg></div>
              <span><strong>CLINICAL STANDARDS</strong><br />Formulated by Experts</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
              <span><strong>INDUSTRY LEADING</strong><br />Expert Team</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></div>
              <span><strong>WORLDWIDE SHIPPING</strong><br />40+ Countries</span>
            </div>
            <div className={styles.trustDivider}></div>
            <div className={styles.trustItem}>
              <div className={styles.trustIcon}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg></div>
              <span><strong>ECO FRIENDLY</strong><br />Safe for the Planet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}