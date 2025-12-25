import { Suspense } from 'react'
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/payload/queries'
import BlogList from '@/components/blog/BlogList'
import BlogSearch from '@/components/blog/BlogSearch'
import BlogFilters from '@/components/blog/BlogFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'İş, İnsan, Psikoloji temasında blog yazıları',
}

interface BlogPageProps {
  searchParams: {
    q?: string
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchQuery = searchParams.q || ''
  const page = parseInt(searchParams.page || '1', 10)

  const [postsResult, categories, tags] = await Promise.all([
    getBlogPosts({
      limit: 12,
      page,
      search: searchQuery || undefined,
    }),
    getBlogCategories(),
    getBlogTags(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600">
            İş, İnsan, Psikoloji temasında güncel içerikler
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<div>Yükleniyor...</div>}>
              <BlogSearch />
            </Suspense>
            <BlogFilters
              categories={categories}
              tags={tags}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">"{searchQuery}"</span> için{' '}
                  <span className="font-semibold">{postsResult.totalDocs}</span> sonuç bulundu
                </p>
              </div>
            )}

            <BlogList posts={postsResult.docs} />

            {/* Pagination */}
            {postsResult.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {page > 1 && (
                  <a
                    href={`/blog?page=${page - 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
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
                    href={`/blog?page=${page + 1}${searchQuery ? `&q=${searchQuery}` : ''}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Sonraki
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

