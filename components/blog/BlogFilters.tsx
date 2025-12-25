'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'

interface BlogFiltersProps {
  categories: Array<{ name: string; slug: string }>
  tags: Array<{ name: string; slug: string }>
  activeCategory?: string
  activeTag?: string
}

export default function BlogFilters({ categories, tags, activeCategory, activeTag }: BlogFiltersProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isActive = (type: 'category' | 'tag', slug: string) => {
    if (type === 'category') return activeCategory === slug
    return activeTag === slug
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ROUTES.BLOG}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !activeCategory && !activeTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={ROUTES.BLOG_CATEGORY(category.slug)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isActive('category', category.slug)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={ROUTES.BLOG_TAG(tag.slug)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isActive('tag', tag.slug)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

