import Link from 'next/link'
import Button from '@/components/ui/Button'
import FeaturedPosts from '@/components/blog/FeaturedPosts'
import { ROUTES } from '@/lib/constants/routes'
import { getBlogPosts } from '@/lib/payload/queries'

export default async function Home() {
  // Get featured blog posts
  const featuredPostsResult = await getBlogPosts({
    limit: 6,
    featured: true,
  })
  
  const featuredPosts = featuredPostsResult.docs
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İş, İnsan, Psikoloji
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Kurumsal wellbeing çözümleri ile çalışanlarınızın potansiyelini ortaya çıkarın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={ROUTES.SERVICES} variant="secondary" size="lg">
                Kurumsal Hizmetler
              </Button>
              <Button href={ROUTES.CONTACT} variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                İletişime Geç
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts posts={featuredPosts} />

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kurumsal eğitimler, atölyeler ve danışmanlık hizmetleri
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kurumsal Eğitimler</h3>
              <p className="text-gray-600 mb-4">
                Çalışanlarınıza özel tasarlanmış eğitim programları
              </p>
              <Button href={ROUTES.TRAININGS} variant="outline" size="sm">
                Eğitimleri İncele
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atölyeler</h3>
              <p className="text-gray-600 mb-4">
                Etkileşimli atölye çalışmaları ve grup aktiviteleri
              </p>
              <Button href={ROUTES.SERVICES} variant="outline" size="sm">
                Detayları Gör
              </Button>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Danışmanlık</h3>
              <p className="text-gray-600 mb-4">
                Kurumsal danışmanlık ve bireysel destek hizmetleri
              </p>
              <Button href={ROUTES.OFFER} variant="outline" size="sm">
                Teklif Al
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Hemen Başlayın</h2>
          <p className="text-xl mb-8 text-blue-100">
            Kurumsal wellbeing çözümlerimiz hakkında daha fazla bilgi alın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={ROUTES.CONTACT} variant="secondary" size="lg">
              İletişime Geç
            </Button>
            <Button href={ROUTES.OFFER} variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
              Teklif İste
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
