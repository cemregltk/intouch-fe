import Card from '@/components/ui/Card'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string
    publishedAt?: string
    featuredImage?: {
      url?: string
      alt?: string
    } | string
    category?: {
      name: string
      slug: string
    } | string
    author?: string
  }
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = typeof post.featuredImage === 'object' 
    ? post.featuredImage?.url 
    : post.featuredImage

  const category = typeof post.category === 'object' 
    ? post.category 
    : null

  return (
    <Card href={ROUTES.BLOG_POST(post.slug)} className="h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={typeof post.featuredImage === 'object' ? post.featuredImage?.alt || post.title : post.title}
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
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          {post.publishedAt && (
            <span>{formatDate(post.publishedAt)}</span>
          )}
          {post.author && (
            <span>{post.author}</span>
          )}
        </div>
      </div>
    </Card>
  )
}

