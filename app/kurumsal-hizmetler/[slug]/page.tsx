import { notFound } from 'next/navigation'
import { getCorporateService } from '@/lib/payload/queries'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Packages from '@/components/services/Packages'
import Process from '@/components/services/Process'
import FAQ from '@/components/services/FAQ'
import RichText from '@/components/blog/RichText'
import StructuredData from '@/components/seo/StructuredData'
import { Metadata } from 'next'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getCorporateService(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  if (!service) {
    return {
      title: 'Hizmet Bulunamadı',
    }
  }

  const title = service.metaTitle || service.title
  const description = service.metaDescription || service.shortDescription || service.title
  const imageUrl = typeof service.heroImage === 'object' && service.heroImage?.url
    ? service.heroImage.url
    : undefined
  const canonical = `${baseUrl}${ROUTES.SERVICE(service.slug)}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: canonical,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getCorporateService(params.slug)

  if (!service) {
    notFound()
  }

  const imageUrl = typeof service.heroImage === 'object' 
    ? service.heroImage?.url 
    : service.heroImage

  const ctaText = service.ctaText || 'Teklif Al'
  const ctaLink = service.ctaLink || ROUTES.OFFER
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const imageUrlForSchema = typeof service.heroImage === 'object' && service.heroImage?.url
    ? `${baseUrl}${service.heroImage.url}`
    : undefined

  return (
    <article className="min-h-screen bg-white">
      <StructuredData
        type="Service"
        data={{
          title: service.title,
          description: service.metaDescription || service.shortDescription || service.description,
          image: imageUrlForSchema,
        }}
      />
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={imageUrl}
            alt={typeof service.heroImage === 'object' ? service.heroImage?.alt || service.title : service.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {service.title}
          </h1>
          {service.shortDescription && (
            <p className="text-xl text-gray-600 mb-6">
              {service.shortDescription}
            </p>
          )}
        </header>

        {/* CTA Button */}
        <div className="mb-12">
          <Button
            href={ctaLink}
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
          >
            {ctaText}
          </Button>
        </div>

        {/* Content */}
        <div className="mb-12">
          <RichText content={service.description} />
        </div>

        {/* Packages */}
        {service.packages && service.packages.length > 0 && (
          <Packages packages={service.packages} />
        )}

        {/* Process */}
        {service.process && service.process.length > 0 && (
          <Process process={service.process} />
        )}

        {/* FAQ */}
        {service.faq && service.faq.length > 0 && (
          <FAQ faq={service.faq} />
        )}

        {/* Bottom CTA */}
        <div className="mt-12 pt-12 border-t text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hizmetimizle İlgileniyor musunuz?
          </h2>
          <p className="text-gray-600 mb-6">
            Size özel teklif hazırlamak için bizimle iletişime geçin
          </p>
          <Button
            href={ctaLink}
            variant="primary"
            size="lg"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </article>
  )
}

