import { useState } from 'react'
import styles from './ContactUs.module.css'

const RECEIVER_EMAIL = 'premiumpaint195@hotmail.com'


export default function ContactUs() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [status, setStatus]   = useState('idle') // idle | sending | sent | error
  const [touched, setTouched] = useState({})

  const set   = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const touch = (k)    => setTouched(t => ({ ...t, [k]: true }))

  const errors = {
    name:    !form.name.trim()    ? 'Full name is required'     : '',
    email:   !form.email.trim()   ? 'Email address is required'
             : !/\S+@\S+\.\S+/.test(form.email) ? 'Enter a valid email' : '',
    phone:   !form.phone.trim()   ? 'Phone number is required'  : '',
    message: !form.message.trim() ? 'Message is required'       : '',
  }
  const hasErrors = Object.values(errors).some(Boolean)

  const submit = async () => {
    setTouched({ name: true, email: true, phone: true, message: true })
    if (hasErrors) return

    setStatus('sending')

    // Try FormSubmit first
    try {
      const formData = new FormData()
      formData.append('name',      form.name.trim())
      formData.append('email',     form.email.trim())
      formData.append('phone',     form.phone.trim())
      formData.append('subject',   form.subject || 'General Enquiry')
      formData.append('message',   form.message.trim())
      formData.append('_subject',  `New Contact Form Message from ${form.name.trim()}`)
      formData.append('_captcha',  'false')
      formData.append('_template', 'table')
      formData.append('_next',     window.location.href)

      const res = await fetch(`https://formsubmit.co/${RECEIVER_EMAIL}`, {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        setStatus('sent')
        return
      }
    } catch (err) {
      console.warn('FormSubmit failed, trying mailto fallback:', err)
    }

    // Fallback: open mailto so message is never lost
    const body = `Name: ${form.name.trim()}%0AEmail: ${form.email.trim()}%0APhone: ${form.phone.trim()}%0ASubject: ${form.subject || 'General Enquiry'}%0A%0AMessage:%0A${form.message.trim()}`
    window.location.href = `mailto:${RECEIVER_EMAIL}?subject=New Contact Form Message from ${encodeURIComponent(form.name.trim())}&body=${body}`
    setStatus('sent')
  }

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.grid}>

          {/* Left — info */}
          <div className={styles.info}>
            <div className={styles.badge}>GET IN TOUCH</div>
            <h2 className={styles.title}>We'd Love to Hear From You</h2>
            <p className={styles.sub}>
              Whether you need technical advice, a trade quote, or just want to find the perfect paint —
              our expert team is here to help. Mon–Fri, 9am–5pm.
            </p>

            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.3 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <span>+44 7878 962923</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <span>premiumpaint195@hotmail.com</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <strong>Hours</strong>
                  <span>Mon–Fri: 9:00am – 5:00pm</span>
                </div>
              </div>
            </div>

            <div className={styles.note}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Free technical advice on all products — no pressure, no obligation.
            </div>
          </div>

          {/* Right — form */}
          <div className={styles.formWrap}>
            {status === 'sent' ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you within 1 business day.</p>
              </div>
            ) : (
              <div className={styles.form}>
                <h3 className={styles.formTitle}>Send Us a Message</h3>

                <div className={styles.row2}>
                  {/* Full Name */}
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      onBlur={() => touch('name')}
                      className={touched.name && errors.name ? styles.inputError : ''}
                    />
                    {touched.name && errors.name && (
                      <span className={styles.fieldError}>{errors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className={styles.field}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      onBlur={() => touch('email')}
                      className={touched.email && errors.email ? styles.inputError : ''}
                    />
                    {touched.email && errors.email && (
                      <span className={styles.fieldError}>{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className={styles.row2}>
                  {/* Phone — now required */}
                  <div className={styles.field}>
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+44 7000 000000"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      onBlur={() => touch('phone')}
                      className={touched.phone && errors.phone ? styles.inputError : ''}
                    />
                    {touched.phone && errors.phone && (
                      <span className={styles.fieldError}>{errors.phone}</span>
                    )}
                  </div>

                  {/* Subject */}
                  <div className={styles.field}>
                    <label>Subject</label>
                    <select value={form.subject} onChange={e => set('subject', e.target.value)}>
                      <option value="">Select a topic...</option>
                      <option>Product Advice</option>
                      <option>Trade / Bulk Order</option>
                      <option>Order Query</option>
                      <option>Returns &amp; Refunds</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className={styles.field}>
                  <label>Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what you need — the more detail the better..."
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    onBlur={() => touch('message')}
                    className={touched.message && errors.message ? styles.inputError : ''}
                  />
                  {touched.message && errors.message && (
                    <span className={styles.fieldError}>{errors.message}</span>
                  )}
                </div>

                {status === 'error' && (
                  <p className={styles.errorMsg}>
                    ⚠️ Something went wrong. Please try again or email us at premiumpaint195@hotmail.com
                  </p>
                )}

                <button
                  className={styles.sendBtn}
                  onClick={submit}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.spinner}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}