import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'

interface TrainingCardProps {
  training: {
    id: string
    title: string
    slug: string
    shortDescription?: string
    thumbnail?: {
      url?: string
      alt?: string
    } | string
    category?: {
      name: string
      slug: string
    } | string
    duration?: string
    level?: string
    requestLink?: string
  }
}

const levelLabels: Record<string, string> = {
  beginner: 'Başlangıç',
  intermediate: 'Orta',
  advanced: 'İleri',
}

export default function TrainingCard({ training }: TrainingCardProps) {
  const imageUrl = typeof training.thumbnail === 'object' 
    ? training.thumbnail?.url 
    : training.thumbnail

  const category = typeof training.category === 'object' 
    ? training.category 
    : null

  const levelLabel = training.level ? levelLabels[training.level] || training.level : null

  return (
    <Card className="h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={typeof training.thumbnail === 'object' ? training.thumbnail?.alt || training.title : training.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        {category && (
          <span className="text-sm text-blue-600 font-medium mb-2">
            {category.name}
          </span>
        )}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {training.title}
        </h3>
        {training.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {training.shortDescription}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {training.duration && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {training.duration}
            </span>
          )}
          {levelLabel && (
            <span className="px-2 py-1 bg-gray-100 rounded text-gray-700">
              {levelLabel}
            </span>
          )}
        </div>
        <div className="mt-auto flex gap-2">
          <Button
            href={ROUTES.TRAINING(training.slug)}
            variant="outline"
            size="sm"
            className="flex-grow"
          >
            Detaylar
          </Button>
          {training.requestLink && (
            <Button
              href={training.requestLink}
              variant="primary"
              size="sm"
              className="flex-grow"
            >
              Talep Et
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

