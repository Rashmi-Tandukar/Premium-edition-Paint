import { useEffect, useRef, useState } from 'react'
import styles from './Newsroom.module.css'

export default function Newsroom() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section className={styles.section} ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <h2 className={styles.title}>Paint Outlet Newsroom</h2>
            <p className={styles.body}>
              Our team of innovators are the first to breakthrough ideas to the paint industry. Check out our latest news, blog posts, and industry updates below.
            </p>
            <div className={styles.btnRow}>
              <a href="#" className="btn-red">LEARN MORE</a>
              <a href="#" className="btn-dark">SHOP NOW</a>
            </div>
          </div>
          <div className={styles.right}>
            {[
              { tag: 'Industry News', title: 'Paint Outlet Wins Best Online Retailer 2024', date: '12 Jan 2025' },
              { tag: 'Product Launch', title: 'Introducing Our New Eco-Friendly Range', date: '28 Feb 2025' },
              { tag: 'Tips & Advice', title: 'Top 10 Painting Mistakes and How to Avoid Them', date: '5 Mar 2025' },
            ].map(n => (
              <a key={n.title} href="#" className={styles.newsItem}>
                <span className={styles.newsTag}>{n.tag}</span>
                <p className={styles.newsTitle}>{n.title}</p>
                <span className={styles.newsDate}>{n.date}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}