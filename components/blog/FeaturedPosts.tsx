import Card from '@/components/ui/Card'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'

interface FeaturedPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  featuredImage?: {
    url?: string
    alt?: string
  }
  category?: {
    name: string
    slug: string
  }
}

interface FeaturedPostsProps {
  posts: FeaturedPost[]
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Öne Çıkan Yazılar</h2>
          <p className="text-gray-600">En güncel içeriklerimiz</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              href={ROUTES.BLOG_POST(post.slug)}
              className="h-full"
            >
              {post.featuredImage?.url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {post.category && (
                  <span className="text-sm text-blue-600 font-medium">
                    {post.category.name}
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                {post.publishedAt && (
                  <p className="text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

