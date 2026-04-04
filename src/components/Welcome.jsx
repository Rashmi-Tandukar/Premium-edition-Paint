import { useState } from 'react'
import styles from './Welcome.module.css'

const cards = [
  {
    icon: '👁️',
    title: 'About Us',
    sub: 'Our story',
    content: `Premium Edition Paint was born from a simple frustration — great paint shouldn't be hard to find or impossible to afford. Founded in Kathmandu, we set out to bridge the gap between trade-quality coatings and the everyday homeowner.\n\nFrom our first tin sold out of a single warehouse, we've grown into one of Nepal's most trusted paint suppliers — stocking hundreds of premium colours across interior, exterior, and specialist ranges. Every product on our shelves has been hand-picked, tested, and approved by our in-house team.\n\nWe're not just selling paint. We're helping people transform the spaces they live and work in — one wall at a time.`,
  },
  {
    icon: '🛒',
    title: 'Why Shop At Paint Outlet?',
    sub: 'Our promise',
    content: `We know you have choices. Here's why thousands of customers come back to us:\n\n✦ Trade prices, no trade account needed — everyone pays the same low price.\n✦ Curated range — we only stock products we'd use ourselves.\n✦ Expert advice — our team has decades of combined decorating experience. Just ask.\n✦ Hassle-free returns — changed your mind? 28 days, no questions asked.\n✦ Fast, reliable delivery — most orders dispatched same day before 2pm.\n\nWe're a family business that treats every order as if it's going to our own home. That standard doesn't waver.`,
  },
  {
    icon: '📦',
    title: 'How Your Product Is Delivered',
    sub: 'Delivery info',
    content: `We've made delivery as straightforward as possible:\n\n📦 Orders placed before 2pm are dispatched the same working day.\n🚚 Standard delivery arrives within 2–4 working days.\n⚡ Express next-day delivery available at checkout.\n🆓 Free delivery on all orders over Rs 5,000.\n\nAll paint is packaged in reinforced boxes with absorbent inner lining — because we know what happens when tins leak in transit. Tracking details are emailed the moment your order leaves our warehouse, so you're never left wondering where your paint is.\n\nFor large trade orders, pallet delivery can be arranged. Contact us directly for a quote.`,
  },
  {
    icon: '🎯',
    title: 'Our Vision',
    sub: 'Our values',
    content: `Our vision is straightforward: make premium paint accessible to everyone — not just the professionals.\n\nFor too long, the best coatings have been locked behind trade accounts, confusing product lines, and inflated retail markups. We're dismantling that. Every person who wants to repaint a bedroom, refresh a garden fence, or overhaul a commercial space deserves access to the same quality materials.\n\nBeyond access, we're committed to sustainability. We're actively transitioning our range toward low-VOC, water-based formulas that are better for indoor air quality and kinder to the environment — without compromising on finish or durability.\n\nGreat paint. Fair prices. No gatekeeping.`,
  },
  {
    icon: '🏆',
    title: 'Ethos',
    sub: 'What drives us',
    content: `Our ethos comes down to three words: quality, honesty, community.\n\nQuality — we refuse to list a product we don't believe in. If it doesn't pass our internal coverage and durability tests, it doesn't reach the shelf. Simple.\n\nHonesty — we'll tell you when a cheaper option does the same job. We'd rather you trust us for life than oversell you once.\n\nCommunity — a percentage of every sale goes toward local community decorating projects, helping schools, shelters, and community centres refresh their spaces at no cost. Paint has the power to lift spirits and transform environments. We want to prove it.\n\nThis isn't just a business. It's a belief that the world looks better with a fresh coat.`,
  },
  {
    icon: '💼',
    title: 'Learn The Bigger Picture',
    sub: 'Women in the paint industry',
    content: `The paint and decorating trade has historically been dominated by men — but that's changing, and we're proud to be part of that shift.\n\nWomen now make up the majority of household purchasing decisions in home improvement, yet the industry rarely reflects that in its marketing, store design, or product communication. We're working to change that from the inside.\n\nWe actively partner with female-led decorating businesses, stock products developed by women chemists and colour specialists, and run a mentorship initiative supporting women entering trades.\n\nOur founder was told the industry "wasn't for her." That's exactly why she built this company. If you're a woman in the trade — or looking to enter it — we see you, we support you, and we're here for it.`,
  },
]

export default function Welcome() {
  const [activeCard, setActiveCard] = useState(null)

  const open  = (i) => setActiveCard(i)
  const close = ()  => setActiveCard(null)

  return (
    <>
      {/* Welcome dark section */}
      <section className={styles.welcomeSec}>
        <div className={styles.welcomeOverlay}></div>
        <div className="container">
          <div className={styles.welcomeContent}>
            <h2 className={styles.welcomeTitle}>Welcome to Premium Edition Paint</h2>
            <p className={styles.welcomeSub}>WE'RE REVOLUTIONIZING THE PAINT &amp; DECORATING INDUSTRY</p>
            <a href="#" className="btn-red">READ MORE</a>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          {Array(6).fill(0).map((_, i) => (
            <span key={i} className={styles.tickerItem}>Revolutionizing the Paint Industry ⭐</span>
          ))}
        </div>
      </div>

      {/* See how section */}
      <section className={styles.seeSec}>
        <div className="container">
          <h2 className="sec-title" style={{ textAlign:'center', marginBottom:8 }}>See how you can be a part of the change</h2>
          <div className={styles.seeGrid}>
            {cards.map((c, i) => (
              <button key={c.title} className={styles.seeCard} onClick={() => open(i)}>
                <span className={styles.seeIcon}>{c.icon}</span>
                <div className={styles.seeCardText}>
                  <p className={styles.seeTitle}>{c.title}</p>
                  <p className={styles.seeSub}>{c.sub}</p>
                </div>
                <span className={styles.seeArrow}>→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeCard !== null && (
        <div className={styles.modalOverlay} onClick={close}>
          <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={close} title="Close">✕</button>
            <div className={styles.modalIcon}>{cards[activeCard].icon}</div>
            <h3 className={styles.modalTitle}>{cards[activeCard].title}</h3>
            <p className={styles.modalSub}>{cards[activeCard].sub}</p>
            <div className={styles.modalDivider} />
            <div className={styles.modalBody}>
              {cards[activeCard].content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}