import { useState } from 'react'
import styles from './faq.module.css'

const faqs = [
  {
    q: 'How do I know which paint is right for my surface?',
    a: 'Use our Paint Finder tool — just answer a few questions about your surface, location (interior/exterior), and any issues like damp or mould, and we\'ll recommend the ideal product.',
  },
  {
    q: 'Can I order sample pots before buying full tins?',
    a: 'Absolutely. We offer 100ml sample pots for most colours in our range. Apply to a patch of your wall, let it dry fully, and view in different lighting before committing.',
  },
  {
    q: 'How many coats of paint will I need?',
    a: 'Most of our paints provide excellent coverage in 1–2 coats. On new plaster or very dark existing colours, a primer or mist coat first is recommended for best results.',
  },
  {
    q: 'Do you offer free delivery?',
    a: 'Yes — we offer free next-day delivery on all orders over £50. Orders under £50 are charged at a flat rate of £4.99, typically arriving within 2 working days.',
  },
  {
    q: 'How long does paint take to dry and cure?',
    a: 'Our water-based paints are touch-dry in 30–60 minutes and ready for a second coat in 2 hours. Full hardness (cure) is reached after 14–28 days depending on conditions.',
  },
  {
    q: 'What is your returns policy?',
    a: 'Unopened tins can be returned within 30 days for a full refund. Tinted or opened paints cannot be returned, but if your order arrives damaged we\'ll replace it immediately.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`${styles.item} ${open ? styles.open : ''}`}>
      <button className={styles.question} onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{q}</span>
        <span className={styles.chevron}>{open ? '−' : '+'}</span>
      </button>
      <div className={styles.answerWrap}>
        <p className={styles.answer}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Got questions?</span>
            <h2 className="sec-title" style={{ textAlign: 'left' }}>
              Frequently<br /><em>asked questions</em>
            </h2>
            <p className={styles.sub}>
              Can't find your answer? Contact our friendly team via live chat or email.
            </p>
          </div>

          <div className={styles.list}>
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}