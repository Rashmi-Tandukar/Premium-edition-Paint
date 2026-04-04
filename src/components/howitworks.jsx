import { useEffect, useRef, useState } from 'react'
import styles from './HowItWorks.module.css'

const steps = [
  {
    step: '01',
    title: 'Choose Your Colour',
    desc: 'Make sure you\u2019ve selected the right product and finish for your surface. Browse our trendiest shades from the Premium Edition Paint range and find your perfect match.',
    icon: '\uD83C\uDFA8',
    accent: '#1a9fd4',
    facts: [
      'Check product title for surface type',
      'Browse trending shades from our range',
      'Order sample pots to test on walls',
    ],
  },
  {
    step: '02',
    title: 'Prepare the Surface',
    desc: 'Proper preparation is key to achieving the best results. Ensure the surface is clean, dry, and free of dust or debris before you begin.',
    icon: '\uD83E\uDEA3',
    accent: '#1a3a9f',
    facts: [
      'Remove any loose or flaking material',
      'Ensure surface is clean and fully dry',
      'Thin first coat 10% with water for bare surfaces',
    ],
  },
  {
    step: '03',
    title: 'Paint',
    desc: 'Easy to use \u2014 for beginners and professionals. Apply with a brush, roller, or spray. Stir well before use and allow 4 hours between coats.',
    icon: '\uD83D\uDD8C\uFE0F',
    accent: '#0b2563',
    facts: [
      'Stir thoroughly before use',
      'Apply 2 coats with brush or roller',
      'Allow 4 hours between each coat',
    ],
  },
  {
    step: '04',
    title: 'Clean Up & Enjoy',
    desc: 'Clean tools with water immediately after use. Seal the tin tightly and store in a cool dry place. Then enjoy your beautifully finished space.',
    icon: '\u2728',
    accent: '#2d8a4e',
    facts: [
      'Rinse tools with water immediately',
      'Seal tin lid tightly after use',
      'Store in a cool, dry place',
    ],
  },
]

export default function HowItWorks() {
  const [visible, setVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(null)
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
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>How It Works</span>
          <h2 className="sec-title">Achieve a Professional Finish <em>in Four Simple Steps</em></h2>
          <p className="sec-sub">From colour selection to the final brushstroke — we make it effortless.</p>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`${styles.step} ${visible ? styles.visible : ''} ${activeStep === i ? styles.active : ''}`}
              style={{ transitionDelay: `${i * 120}ms`, '--accent': s.accent }}
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {i < steps.length - 1 && <div className={styles.connector} />}

              <div className={styles.badge}>{s.step}</div>

              <div className={styles.top}>
                <div className={styles.iconWrap}>
                  <span className={styles.stepIcon}>{s.icon}</span>
                </div>
              </div>

              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.desc}>{s.desc}</p>

              <ul className={styles.factList}>
                {s.facts.map((f, fi) => (
                  <li key={fi} className={styles.factItem}>
                    <span className={styles.factDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}