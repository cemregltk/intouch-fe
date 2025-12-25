import { getCorporateServices } from '@/lib/payload/queries'
import ServiceList from '@/components/services/ServiceList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kurumsal Hizmetler',
  description: 'Kurumsal eğitimler, atölyeler ve danışmanlık hizmetleri',
}

export default async function CorporateServicesPage() {
  const servicesResult = await getCorporateServices({
    limit: 100,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kurumsal Hizmetler</h1>
          <p className="text-lg text-gray-600">
            Kurumsal eğitimler, atölyeler ve danışmanlık hizmetleri ile çalışanlarınızın potansiyelini ortaya çıkarın
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ServiceList services={servicesResult.docs} />
      </div>
    </div>
  )
}

