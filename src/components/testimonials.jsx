import { useEffect, useRef, useState } from 'react'
import styles from './testimonials.module.css'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Homeowner, London',
    avatar: '👩',
    rating: 5,
    text: "Used the anti-mould paint in my bathroom — six months on and not a single spot. The coverage was incredible, one coat did the whole room.",
  },
  {
    name: 'James R.',
    role: 'Professional Decorator',
    avatar: '👨',
    rating: 5,
    text: "I've tried dozens of brands over 15 years. The exterior masonry paint is genuinely the best I've used. My clients always comment on how long the finish lasts.",
  },
  {
    name: 'Priya K.',
    role: 'Interior Designer',
    avatar: '🧑',
    rating: 5,
    text: "The colour range is stunning and the finish is silky smooth. The sample pots made it so easy to test shades before committing. Will not use another brand.",
  },
  {
    name: 'Tom B.',
    role: 'Landlord, Manchester',
    avatar: '🧔',
    rating: 4,
    text: "Great value for money. Fast delivery and the paint goes on really well. My go-to for all my rental properties between tenants.",
  },
  {
    name: 'Linda C.',
    role: 'DIY Enthusiast',
    avatar: '👵',
    rating: 5,
    text: "I was nervous about painting my kitchen cupboards but the step-by-step guide on the website made it so simple. The result looks completely professional.",
  },
  {
    name: 'Daniel F.',
    role: 'Garden Designer',
    avatar: '🧑‍🌾',
    rating: 5,
    text: "The garden paint range is brilliant — excellent adhesion on wood, metal, and concrete. Held up perfectly through a very wet winter.",
  },
]

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Customer reviews</span>
          <h2 className="sec-title">Trusted by thousands <em>of painters</em></h2>
          <p className="sec-sub">Real feedback from homeowners, decorators and designers who rely on our products.</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`${styles.card} ${visible ? styles.visible : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Stars count={t.rating} />
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <span className={styles.avatar}>{t.avatar}</span>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}