import { notFound } from 'next/navigation'
import { getBlogTag, getBlogPosts } from '@/lib/payload/queries'
import BlogList from '@/components/blog/BlogList'
import { Metadata } from 'next'

interface TagPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getBlogTag(params.slug)

  if (!tag) {
    return {
      title: 'Etiket Bulunamadı',
    }
  }

  return {
    title: `#${tag.name} - Blog`,
    description: `${tag.name} etiketindeki yazılar`,
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tag = await getBlogTag(params.slug)

  if (!tag) {
    notFound()
  }

  const page = parseInt(searchParams.page || '1', 10)
  const postsResult = await getBlogPosts({
    limit: 12,
    page,
    tag: params.slug,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            #{tag.name}
          </h1>
          <p className="text-lg text-gray-600">
            Bu etikete sahip {postsResult.totalDocs} yazı bulundu
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogList posts={postsResult.docs} />

        {/* Pagination */}
        {postsResult.totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {page > 1 && (
              <a
                href={`/blog/etiket/${params.slug}?page=${page - 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Önceki
              </a>
            )}
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Sayfa {page} / {postsResult.totalPages}
            </span>
            {page < postsResult.totalPages && (
              <a
                href={`/blog/etiket/${params.slug}?page=${page + 1}`}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Sonraki
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

