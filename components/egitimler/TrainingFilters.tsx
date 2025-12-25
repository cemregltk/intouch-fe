'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'

interface TrainingFiltersProps {
  categories: Array<{ name: string; slug: string }>
  activeCategory?: string
  activeLevel?: string
}

const levels = [
  { value: '', label: 'Tüm Seviyeler' },
  { value: 'beginner', label: 'Başlangıç' },
  { value: 'intermediate', label: 'Orta' },
  { value: 'advanced', label: 'İleri' },
]

export default function TrainingFilters({ categories, activeCategory, activeLevel }: TrainingFiltersProps) {
  const pathname = usePathname()

  return (
    <div className="mb-8 space-y-6">
      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Kategoriler</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ROUTES.TRAININGS}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !activeCategory && !activeLevel
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </Link>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`${ROUTES.TRAININGS}?kategori=${category.slug}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeCategory === category.slug
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

      {/* Levels */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Seviye</h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => {
            const href = level.value 
              ? `${ROUTES.TRAININGS}?seviye=${level.value}${activeCategory ? `&kategori=${activeCategory}` : ''}`
              : ROUTES.TRAININGS
            return (
              <Link
                key={level.value}
                href={href}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeLevel === level.value || (!activeLevel && level.value === '')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

