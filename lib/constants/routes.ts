export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  BLOG_CATEGORY: (slug: string) => `/blog/kategori/${slug}`,
  BLOG_TAG: (slug: string) => `/blog/etiket/${slug}`,
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  TRAININGS: '/egitimler',
  TRAINING: (slug: string) => `/egitimler/${slug}`,
  SERVICES: '/kurumsal-hizmetler',
  SERVICE: (slug: string) => `/kurumsal-hizmetler/${slug}`,
  NEWSLETTER: '/bulten',
  NEWSLETTER_ITEM: (slug: string) => `/bulten/${slug}`,
  CONTACT: '/iletisim',
  OFFER: '/tekif',
} as const

