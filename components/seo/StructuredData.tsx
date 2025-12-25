interface StructuredDataProps {
  type: 'Organization' | 'Article' | 'Course' | 'Service'
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: data.name || 'Wellbeing',
          url: baseUrl,
          logo: data.logo || `${baseUrl}/logo.png`,
          description: data.description,
          contactPoint: {
            '@type': 'ContactPoint',
            email: data.email,
            telephone: data.phone,
          },
          sameAs: data.socialLinks ? Object.values(data.socialLinks).filter(Boolean) : [],
        }

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description || data.excerpt,
          image: data.image,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt || data.publishedAt,
          author: {
            '@type': 'Person',
            name: data.author || 'Marka Editörü',
          },
          publisher: {
            '@type': 'Organization',
            name: data.publisherName || 'Wellbeing',
            logo: {
              '@type': 'ImageObject',
              url: data.publisherLogo || `${baseUrl}/logo.png`,
            },
          },
        }

      case 'Course':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: data.title,
          description: data.description || data.shortDescription,
          image: data.image,
          provider: {
            '@type': 'Organization',
            name: 'Wellbeing',
            url: baseUrl,
          },
          courseCode: data.slug,
        }

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.title,
          description: data.description || data.shortDescription,
          image: data.image,
          provider: {
            '@type': 'Organization',
            name: 'Wellbeing',
            url: baseUrl,
          },
          areaServed: 'TR',
          serviceType: 'Corporate Training',
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

