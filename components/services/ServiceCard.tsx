import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'

interface ServiceCardProps {
  service: {
    id: string
    title: string
    slug: string
    shortDescription?: string
    heroImage?: {
      url?: string
      alt?: string
    } | string
    ctaText?: string
    ctaLink?: string
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const imageUrl = typeof service.heroImage === 'object' 
    ? service.heroImage?.url 
    : service.heroImage

  const ctaText = service.ctaText || 'Detayları Gör'
  const ctaLink = service.ctaLink || ROUTES.SERVICE(service.slug)

  return (
    <Card href={ROUTES.SERVICE(service.slug)} className="h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={typeof service.heroImage === 'object' ? service.heroImage?.alt || service.title : service.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {service.title}
        </h3>
        {service.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {service.shortDescription}
          </p>
        )}
        <Button
          href={ctaLink}
          variant="primary"
          size="sm"
          className="mt-auto"
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  )
}

