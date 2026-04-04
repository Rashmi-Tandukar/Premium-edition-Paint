import { useEffect, useRef, useState } from 'react'
import styles from './Features.module.css'

const features = [
  {
    icon: '🎨',
    title: 'Premium Pigments',
    desc: 'Rich, lasting colour derived from high-grade pigments that resist UV fading for 10+ years.',
  },
  {
    icon: '🛡️',
    title: 'Weather Resistant',
    desc: 'Engineered to withstand harsh rain, frost, and heat — keeping surfaces protected year-round.',
  },
  {
    icon: '♻️',
    title: 'Eco Formulas',
    desc: 'Low-VOC and water-based options that are safe for your family and kind to the environment.',
  },
  {
    icon: '⚡',
    title: 'Fast Drying',
    desc: 'Touch-dry in as little as 30 minutes so you can apply second coats the same day.',
  },
  {
    icon: '🖌️',
    title: 'Smooth Finish',
    desc: 'Self-levelling formula eliminates brush marks for a flawless, professional result every time.',
  },
  {
    icon: '🔒',
    title: 'Guaranteed Coverage',
    desc: 'Exceptional hide and opacity — most surfaces covered in just one to two coats.',
  },
]

export default function Features() {
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
          <span className={styles.eyebrow}>Why choose us</span>
          <h2 className="sec-title">Built to perform. <em>Made to last.</em></h2>
          <p className="sec-sub">
            Every product in our range is developed with professional painters and tested in real-world conditions.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${styles.card} ${visible ? styles.visible : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.iconWrap}>{f.icon}</div>
              <h3 className={styles.title}>{f.title}</h3>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}