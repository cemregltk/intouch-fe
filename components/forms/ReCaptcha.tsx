'use client'

import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

interface ReCaptchaProps {
  onChange: (token: string | null) => void
  onError?: () => void
}

export default function ReCaptcha({ onChange, onError }: ReCaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  if (!siteKey) {
    // Development mode - no ReCAPTCHA
    return null
  }

  return (
    <div className="mb-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={onChange}
        onErrored={onError}
        theme="light"
      />
    </div>
  )
}

