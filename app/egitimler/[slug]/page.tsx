import { notFound } from 'next/navigation'
import { getTraining, getTrainings } from '@/lib/payload/queries'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import RequestButton from '@/components/egitimler/RequestButton'
import TrainingCard from '@/components/egitimler/TrainingCard'
import RichText from '@/components/blog/RichText'
import StructuredData from '@/components/seo/StructuredData'
import { Metadata } from 'next'

interface TrainingPageProps {
  params: {
    slug: string
  }
}

const levelLabels: Record<string, string> = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
  advanced: 'İleri',
}

export async function generateMetadata({ params }: TrainingPageProps): Promise<Metadata> {
  const training = await getTraining(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  if (!training) {
    return {
      title: 'Eğitim Bulunamadı',
    }
  }

  const title = training.metaTitle || training.title
  const description = training.metaDescription || training.shortDescription || training.title
  const imageUrl = typeof training.thumbnail === 'object' && training.thumbnail?.url
    ? training.thumbnail.url
    : undefined
  const canonical = `${baseUrl}${ROUTES.TRAINING(training.slug)}`

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
          alt: training.title,
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

export default async function TrainingPage({ params }: TrainingPageProps) {
  const training = await getTraining(params.slug)

  if (!training) {
    notFound()
  }

  // Get related trainings
  const relatedTrainingsResult = await getTrainings({
    limit: 3,
    category: typeof training.category === 'object' ? training.category.slug : undefined,
  })

  const relatedTrainings = relatedTrainingsResult.docs.filter((t: any) => t.id !== training.id).slice(0, 3)

  const imageUrl = typeof training.thumbnail === 'object' 
    ? training.thumbnail?.url 
    : training.thumbnail

  const category = typeof training.category === 'object' ? training.category : null
  const levelLabel = training.level ? levelLabels[training.level] || training.level : null
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const imageUrlForSchema = typeof training.thumbnail === 'object' && training.thumbnail?.url
    ? `${baseUrl}${training.thumbnail.url}`
    : undefined

  return (
    <article className="min-h-screen bg-white">
      <StructuredData
        type="Course"
        data={{
          title: training.title,
          description: training.metaDescription || training.shortDescription || training.description,
          image: imageUrlForSchema,
          slug: training.slug,
        }}
      />
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={imageUrl}
            alt={typeof training.thumbnail === 'object' ? training.thumbnail?.alt || training.title : training.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          {category && (
            <Link
              href={`${ROUTES.TRAININGS}?kategori=${category.slug}`}
              className="text-blue-600 font-medium hover:underline mb-2 inline-block"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {training.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            {training.duration && (
              <span className="flex items-center gap-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {training.duration}
              </span>
            )}
            {levelLabel && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                {levelLabel}
              </span>
            )}
            {training.publishedAt && (
              <time dateTime={training.publishedAt}>
                {formatDate(training.publishedAt)}
              </time>
            )}
          </div>
        </header>

        {/* CTA Button */}
        <div className="mb-8">
          <RequestButton
            requestLink={training.requestLink}
            deliveryMethod={training.deliveryMethod}
            className="w-full md:w-auto"
          />
        </div>

        {/* Content */}
        <div className="mb-12">
          <RichText content={training.description} />
        </div>

        {/* Delivery Method Info */}
        {training.deliveryMethod && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teslimat Yöntemi</h3>
            <p className="text-gray-700">
              {training.deliveryMethod === 'link' && 'Eğitim linki e-posta ile gönderilecektir.'}
              {training.deliveryMethod === 'drive' && 'Eğitim içeriği Google Drive üzerinden paylaşılacaktır.'}
              {training.deliveryMethod === 'email' && 'Eğitim içeriği e-posta ile gönderilecektir.'}
            </p>
          </div>
        )}

        {/* Related Trainings */}
        {relatedTrainings.length > 0 && (
          <section className="mt-12 pt-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Eğitimler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTrainings.map((relatedTraining: any) => (
                <TrainingCard key={relatedTraining.id} training={relatedTraining} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

