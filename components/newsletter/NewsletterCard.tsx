import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'

interface NewsletterCardProps {
  newsletter: {
    id: string
    title: string
    slug: string
    description?: string
    thumbnail?: {
      url?: string
      alt?: string
    } | string
    pdfFile?: {
      url?: string
      filename?: string
    } | string
    publishedAt?: string
    downloadCount?: number
  }
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const imageUrl = typeof newsletter.thumbnail === 'object' 
    ? newsletter.thumbnail?.url 
    : newsletter.thumbnail

  const pdfUrl = typeof newsletter.pdfFile === 'object' 
    ? newsletter.pdfFile?.url 
    : newsletter.pdfFile

  return (
    <Card href={ROUTES.NEWSLETTER_ITEM(newsletter.slug)} className="h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={typeof newsletter.thumbnail === 'object' ? newsletter.thumbnail?.alt || newsletter.title : newsletter.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {newsletter.title}
        </h3>
        {newsletter.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {newsletter.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          {newsletter.publishedAt && (
            <span className="text-sm text-gray-500">
              {formatDate(newsletter.publishedAt)}
            </span>
          )}
          {pdfUrl && (
            <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

