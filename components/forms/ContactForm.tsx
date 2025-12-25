'use client'

import { useState, FormEvent } from 'react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import ReCaptcha from './ReCaptcha'
import { validateContactForm, ValidationResult } from '@/lib/utils/validation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    kvkkConsent: false,
  })
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    // Client-side validation
    const validation: ValidationResult = validateContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      kvkkConsent: formData.kvkkConsent,
    })

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    // ReCAPTCHA check (if enabled)
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setErrors({ recaptcha: 'Lütfen reCAPTCHA doğrulamasını tamamlayın' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          kvkkConsent: false,
        })
        setRecaptchaToken(null)
        // Reset ReCAPTCHA
        if (typeof window !== 'undefined' && (window as any).grecaptcha) {
          ;(window as any).grecaptcha.reset()
        }
      } else {
        setSubmitStatus('error')
        setErrors({ submit: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.' })
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-lg font-semibold text-green-900 mb-2">Mesajınız Gönderildi!</h3>
        <p className="text-green-700">En kısa sürede size dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Ad Soyad *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Input
          label="E-posta *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Telefon"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Konu"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />
      </div>

      <Textarea
        label="Mesaj *"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={6}
        required
      />

      <div className="flex items-start">
        <input
          type="checkbox"
          id="kvkkConsent"
          name="kvkkConsent"
          checked={formData.kvkkConsent}
          onChange={handleChange}
          className="mt-1 mr-2"
        />
        <label htmlFor="kvkkConsent" className="text-sm text-gray-700">
          <a href="/kvkk" target="_blank" className="text-blue-600 hover:underline">
            KVKK Aydınlatma Metni
          </a>
          'ni okudum ve kabul ediyorum. *
        </label>
      </div>
      {errors.kvkkConsent && (
        <p className="text-sm text-red-600">{errors.kvkkConsent}</p>
      )}

      <ReCaptcha onChange={handleRecaptchaChange} />
      {errors.recaptcha && (
        <p className="text-sm text-red-600">{errors.recaptcha}</p>
      )}

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
      </Button>
    </form>
  )
}

