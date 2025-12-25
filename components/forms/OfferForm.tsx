'use client'

import { useState, FormEvent, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import ReCaptcha from './ReCaptcha'
import { validateOfferForm, ValidationResult } from '@/lib/utils/validation'
import { getCorporateServices } from '@/lib/payload/queries'

interface OfferFormProps {
  initialServiceInterest?: string[]
}

export default function OfferForm({ initialServiceInterest = [] }: OfferFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    serviceInterest: initialServiceInterest,
    participantCount: '',
    budget: '',
    message: '',
    kvkkConsent: false,
  })
  const [services, setServices] = useState<any[]>([])
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Load services for multi-select
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) {
          setServices(data.services)
        }
      })
      .catch(() => {})
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      if (name === 'serviceInterest') {
        setFormData((prev) => ({
          ...prev,
          serviceInterest: checkbox.checked
            ? [...prev.serviceInterest, value]
            : prev.serviceInterest.filter((id) => id !== value),
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

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
    const validation: ValidationResult = validateOfferForm({
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      serviceInterest: formData.serviceInterest,
      participantCount: formData.participantCount ? parseInt(formData.participantCount, 10) : undefined,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
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
      const response = await fetch('/api/offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          participantCount: formData.participantCount ? parseInt(formData.participantCount, 10) : undefined,
          budget: formData.budget ? parseFloat(formData.budget) : undefined,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phone: '',
          serviceInterest: [],
          participantCount: '',
          budget: '',
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
        <h3 className="text-lg font-semibold text-green-900 mb-2">Teklif Talebiniz Alındı!</h3>
        <p className="text-green-700">En kısa sürede size özel teklif hazırlayıp dönüş yapacağız.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Şirket Adı *"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          required
        />
        <Input
          label="İletişim Kişisi *"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          error={errors.contactName}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="E-posta *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          label="Telefon *"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          İlgilendiğiniz Hizmetler
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border border-gray-300 rounded-lg p-4">
          {services.map((service) => (
            <label key={service.id} className="flex items-center">
              <input
                type="checkbox"
                name="serviceInterest"
                value={service.id}
                checked={formData.serviceInterest.includes(service.id)}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{service.title}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Tahmini Katılımcı Sayısı"
          type="number"
          name="participantCount"
          value={formData.participantCount}
          onChange={handleChange}
          error={errors.participantCount}
          min="1"
        />
        <Input
          label="Bütçe (TL)"
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          error={errors.budget}
          min="0"
          step="0.01"
        />
      </div>

      <Textarea
        label="Mesaj"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        rows={6}
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
        {isSubmitting ? 'Gönderiliyor...' : 'Teklif İste'}
      </Button>
    </form>
  )
}

