import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from '../styles/contactForm.module.scss'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [recaptchaValue, setRecaptchaValue] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!recaptchaValue) {
      setSubmitStatus({ type: 'error', message: 'Por favor verifica el reCAPTCHA' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          'g-recaptcha-response': recaptchaValue
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: '¡Mensaje enviado! Te contactaré pronto.' })
        setFormData({ name: '', email: '', message: '' })
        setRecaptchaValue(null)
      } else {
        setSubmitStatus({ type: 'error', message: 'Algo salió mal. Por favor intenta de nuevo.' })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Error al enviar. Por favor intenta de nuevo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Tu nombre"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.label}>Mensaje</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tu mensaje..."
          rows="5"
          className={styles.textarea}
        />
      </div>

      <div className={styles.recaptchaContainer}>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          onChange={handleRecaptchaChange}
          theme="dark"
        />
      </div>

      {submitStatus && (
        <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  )
}

export default ContactForm
