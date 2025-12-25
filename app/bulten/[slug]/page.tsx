import { notFound } from 'next/navigation'
import { getNewsletter } from '@/lib/payload/queries'
import { formatDate } from '@/lib/utils/format'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Metadata } from 'next'

interface NewsletterPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata> {
  const newsletter = await getNewsletter(params.slug)

  if (!newsletter) {
    return {
      title: 'Bülten Bulunamadı',
    }
  }

  return {
    title: newsletter.metaTitle || newsletter.title,
    description: newsletter.metaDescription || newsletter.description || newsletter.title,
    openGraph: {
      title: newsletter.metaTitle || newsletter.title,
      description: newsletter.metaDescription || newsletter.description || newsletter.title,
      images: typeof newsletter.thumbnail === 'object' && newsletter.thumbnail?.url
        ? [newsletter.thumbnail.url]
        : [],
    },
  }
}

export default async function NewsletterPage({ params }: NewsletterPageProps) {
  const newsletter = await getNewsletter(params.slug)

  if (!newsletter) {
    notFound()
  }

  const imageUrl = typeof newsletter.thumbnail === 'object' 
    ? newsletter.thumbnail?.url 
    : newsletter.thumbnail

  const pdfUrl = typeof newsletter.pdfFile === 'object' 
    ? newsletter.pdfFile?.url 
    : newsletter.pdfFile

  const pdfFilename = typeof newsletter.pdfFile === 'object' 
    ? newsletter.pdfFile?.filename || 'bulten.pdf'
    : 'bulten.pdf'

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={imageUrl}
            alt={typeof newsletter.thumbnail === 'object' ? newsletter.thumbnail?.alt || newsletter.title : newsletter.title}
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
            {newsletter.title}
          </h1>
          {newsletter.description && (
            <p className="text-xl text-gray-600 mb-4">
              {newsletter.description}
            </p>
          )}
          {newsletter.publishedAt && (
            <time dateTime={newsletter.publishedAt} className="text-sm text-gray-500">
              {formatDate(newsletter.publishedAt)}
            </time>
          )}
        </header>

        {/* PDF Download Button */}
        {pdfUrl && (
          <div className="mb-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  PDF İndir
                </h3>
                <p className="text-sm text-gray-600">
                  Bülteni PDF formatında indirebilirsiniz
                </p>
                {newsletter.downloadCount !== undefined && newsletter.downloadCount > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {newsletter.downloadCount} kez indirildi
                  </p>
                )}
              </div>
              <Button
                href={pdfUrl}
                variant="primary"
                size="lg"
                className="ml-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF İndir
              </Button>
            </div>
          </div>
        )}

        {/* PDF Preview (iframe) */}
        {pdfUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Önizleme</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                className="w-full h-[600px] md:h-[800px]"
                title={newsletter.title}
              />
            </div>
          </div>
        )}

        {/* Back to Archive */}
        <div className="mt-12 pt-12 border-t text-center">
          <Button
            href="/bulten"
            variant="outline"
            size="lg"
          >
            ← Bülten Arşivine Dön
          </Button>
        </div>
      </div>
    </article>
  )
}

