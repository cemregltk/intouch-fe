import { MetadataRoute } from 'next'
import { getBlogPosts, getTrainings, getCorporateServices, getNewsletters } from '@/lib/payload/queries'
import { ROUTES } from '@/lib/constants/routes'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}${ROUTES.BLOG}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.TRAININGS}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.SERVICES}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${ROUTES.NEWSLETTER}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${ROUTES.CONTACT}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}${ROUTES.OFFER}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Blog posts
  const blogPostsResult = await getBlogPosts({ limit: 1000 })
  const blogPages: MetadataRoute.Sitemap = blogPostsResult.docs.map((post: any) => ({
    url: `${baseUrl}${ROUTES.BLOG_POST(post.slug)}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Trainings
  const trainingsResult = await getTrainings({ limit: 1000 })
  const trainingPages: MetadataRoute.Sitemap = trainingsResult.docs.map((training: any) => ({
    url: `${baseUrl}${ROUTES.TRAINING(training.slug)}`,
    lastModified: training.publishedAt ? new Date(training.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Corporate Services
  const servicesResult = await getCorporateServices({ limit: 1000 })
  const servicePages: MetadataRoute.Sitemap = servicesResult.docs.map((service: any) => ({
    url: `${baseUrl}${ROUTES.SERVICE(service.slug)}`,
    lastModified: service.publishedAt ? new Date(service.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Newsletters
  const newslettersResult = await getNewsletters({ limit: 1000 })
  const newsletterPages: MetadataRoute.Sitemap = newslettersResult.docs.map((newsletter: any) => ({
    url: `${baseUrl}${ROUTES.NEWSLETTER_ITEM(newsletter.slug)}`,
    lastModified: newsletter.publishedAt ? new Date(newsletter.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...trainingPages,
    ...servicePages,
    ...newsletterPages,
  ]
}

