import ContactForm from '@/components/forms/ContactForm'
import { Metadata } from 'next'
import { getSiteSettings } from '@/lib/payload/queries'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bizimle iletişime geçin',
}

export default async function ContactPage() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
          <p className="text-lg text-gray-600">
            Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Formu</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
            <div className="space-y-6">
              {siteSettings?.contactEmail && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">E-posta</h3>
                  <a
                    href={`mailto:${siteSettings.contactEmail}`}
                    className="text-blue-600 hover:underline"
                  >
                    {siteSettings.contactEmail}
                  </a>
                </div>
              )}
              {siteSettings?.contactPhone && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Telefon</h3>
                  <a
                    href={`tel:${siteSettings.contactPhone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {siteSettings.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

