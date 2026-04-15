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
  const [validationErrors, setValidationErrors] = useState({})

  const skipRecaptcha = import.meta.env.VITE_SKIP_RECAPTCHA === 'true'

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Por favor ingresa un email válido'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres'
    } else if (formData.message.length > 5000) {
      errors.message = 'El mensaje no puede exceder 5000 caracteres'
    }
    
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors)
      setSubmitStatus(null)
      return
    }

    if (!skipRecaptcha && !recaptchaValue) {
      setSubmitStatus({ type: 'error', message: 'Por favor verifica el reCAPTCHA' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
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
        setValidationErrors({})
      } else {
        const errorData = await response.json().catch(() => ({}))
        setSubmitStatus({ 
          type: 'error', 
          message: errorData.error || 'Algo salió mal. Por favor intenta de nuevo.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error de conexión. Por favor verifica tu conexión a internet e intenta de nuevo.'
      })
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
          className={`${styles.input} ${validationErrors.name ? styles.inputError : ''}`}
          maxLength="100"
        />
        {validationErrors.name && <span className={styles.errorText}>{validationErrors.name}</span>}
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
          className={`${styles.input} ${validationErrors.email ? styles.inputError : ''}`}
          maxLength="254"
        />
        {validationErrors.email && <span className={styles.errorText}>{validationErrors.email}</span>}
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
          className={`${styles.textarea} ${validationErrors.message ? styles.inputError : ''}`}
          maxLength="5000"
        />
        <div className={styles.charCounter}>
          {formData.message.length} / 5000
        </div>
        {validationErrors.message && <span className={styles.errorText}>{validationErrors.message}</span>}
      </div>

      <div className={styles.recaptchaContainer}>
        {skipRecaptcha ? (
          <div className={styles.devNotice}>
            reCAPTCHA disabled for development
          </div>
        ) : (
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            theme="dark"
          />
        )}
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
