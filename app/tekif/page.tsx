import OfferForm from '@/components/forms/OfferForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teklif Al',
  description: 'Kurumsal hizmetlerimiz için özel teklif alın',
}

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Teklif Al</h1>
          <p className="text-lg text-gray-600">
            Kurumsal hizmetlerimiz için size özel teklif hazırlamak istiyoruz. Lütfen formu doldurun.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <OfferForm />
      </div>
    </div>
  )
}

