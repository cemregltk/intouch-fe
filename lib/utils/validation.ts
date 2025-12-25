export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  // Turkish phone number validation (basic)
  const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validateMinLength(value: string, min: number): boolean {
  return value.trim().length >= min
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.trim().length <= max
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateContactForm(data: {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  kvkkConsent: boolean
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!validateRequired(data.name)) {
    errors.name = 'Ad Soyad gereklidir'
  }

  if (!validateRequired(data.email)) {
    errors.email = 'E-posta gereklidir'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz'
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Geçerli bir telefon numarası giriniz'
  }

  if (!validateRequired(data.message)) {
    errors.message = 'Mesaj gereklidir'
  } else if (!validateMinLength(data.message, 10)) {
    errors.message = 'Mesaj en az 10 karakter olmalıdır'
  }

  if (!data.kvkkConsent) {
    errors.kvkkConsent = 'KVKK onayı gereklidir'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateOfferForm(data: {
  companyName: string
  contactName: string
  email: string
  phone: string
  serviceInterest?: string[]
  participantCount?: number
  budget?: number
  message?: string
  kvkkConsent: boolean
}): ValidationResult {
  const errors: Record<string, string> = {}

  if (!validateRequired(data.companyName)) {
    errors.companyName = 'Şirket adı gereklidir'
  }

  if (!validateRequired(data.contactName)) {
    errors.contactName = 'İletişim kişisi gereklidir'
  }

  if (!validateRequired(data.email)) {
    errors.email = 'E-posta gereklidir'
  } else if (!validateEmail(data.email)) {
    errors.email = 'Geçerli bir e-posta adresi giriniz'
  }

  if (!validateRequired(data.phone)) {
    errors.phone = 'Telefon numarası gereklidir'
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Geçerli bir telefon numarası giriniz'
  }

  if (!data.kvkkConsent) {
    errors.kvkkConsent = 'KVKK onayı gereklidir'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

