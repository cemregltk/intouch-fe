import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts, getSiteSettings } from '@/lib/payload/queries'
import { formatDate } from '@/lib/utils/format'
import { ROUTES } from '@/lib/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import BlogCard from '@/components/blog/BlogCard'
import RichText from '@/components/blog/RichText'
import StructuredData from '@/components/seo/StructuredData'
import { Metadata } from 'next'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
    }
  }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt || post.title
  const imageUrl = typeof post.featuredImage === 'object' && post.featuredImage?.url
    ? post.featuredImage.url
    : undefined
  const canonical = `${baseUrl}${ROUTES.BLOG_POST(post.slug)}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      images: imageUrl ? [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : [],
      publishedTime: post.publishedAt,
      authors: [post.author || 'Marka Editörü'],
      tags: Array.isArray(post.tags) 
        ? post.tags.filter((tag: any) => typeof tag === 'object').map((tag: any) => tag.name)
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts
  const relatedPostsResult = await getBlogPosts({
    limit: 3,
    category: typeof post.category === 'object' ? post.category.slug : undefined,
  })

  const relatedPosts = relatedPostsResult.docs.filter((p: any) => p.id !== post.id).slice(0, 3)

  const imageUrl = typeof post.featuredImage === 'object' 
    ? post.featuredImage?.url 
    : post.featuredImage

  const category = typeof post.category === 'object' ? post.category : null
  const tags = Array.isArray(post.tags) 
    ? post.tags.filter((tag: any) => typeof tag === 'object')
    : []

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const siteSettings = await getSiteSettings()
  const imageUrlForSchema = typeof post.featuredImage === 'object' && post.featuredImage?.url
    ? `${baseUrl}${post.featuredImage.url}`
    : undefined

  return (
    <article className="min-h-screen bg-white">
      <StructuredData
        type="Article"
        data={{
          title: post.title,
          description: post.metaDescription || post.excerpt || post.title,
          image: imageUrlForSchema,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt || post.publishedAt,
          author: post.author || 'Marka Editörü',
          publisherName: siteSettings?.siteName || 'Wellbeing',
          publisherLogo: siteSettings?.logo && typeof siteSettings.logo === 'object' 
            ? `${baseUrl}${siteSettings.logo.url}`
            : undefined,
        }}
      />
      {/* Hero Image */}
      {imageUrl && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={imageUrl}
            alt={typeof post.featuredImage === 'object' ? post.featuredImage?.alt || post.title : post.title}
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
              href={ROUTES.BLOG_CATEGORY(category.slug)}
              className="text-blue-600 font-medium hover:underline mb-2 inline-block"
            >
              {category.name}
            </Link>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            )}
            {post.author && (
              <span>Yazar: {post.author}</span>
            )}
          </div>
        </header>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag: any) => (
              <Link
                key={tag.slug}
                href={ROUTES.BLOG_TAG(tag.slug)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="mb-12">
          <RichText content={post.content} />
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 pt-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}

