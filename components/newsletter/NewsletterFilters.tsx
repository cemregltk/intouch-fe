'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/lib/constants/routes'

interface NewsletterFiltersProps {
  years: number[]
  activeYear?: number
  activeMonth?: number
}

const months = [
  { value: 0, label: 'Tüm Aylar' },
  { value: 1, label: 'Ocak' },
  { value: 2, label: 'Şubat' },
  { value: 3, label: 'Mart' },
  { value: 4, label: 'Nisan' },
  { value: 5, label: 'Mayıs' },
  { value: 6, label: 'Haziran' },
  { value: 7, label: 'Temmuz' },
  { value: 8, label: 'Ağustos' },
  { value: 9, label: 'Eylül' },
  { value: 10, label: 'Ekim' },
  { value: 11, label: 'Kasım' },
  { value: 12, label: 'Aralık' },
]

export default function NewsletterFilters({ years, activeYear, activeMonth }: NewsletterFiltersProps) {
  const pathname = usePathname()

  return (
    <div className="mb-8 space-y-6">
      {/* Years */}
      {years.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Yıl</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={ROUTES.NEWSLETTER}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                !activeYear && !activeMonth
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </Link>
            {years.map((year) => (
              <Link
                key={year}
                href={`${ROUTES.NEWSLETTER}?yil=${year}`}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeYear === year
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Months */}
      {activeYear && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Ay</h3>
          <div className="flex flex-wrap gap-2">
            {months.map((month) => {
              const href = month.value === 0
                ? `${ROUTES.NEWSLETTER}?yil=${activeYear}`
                : `${ROUTES.NEWSLETTER}?yil=${activeYear}&ay=${month.value}`
              return (
                <Link
                  key={month.value}
                  href={href}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeMonth === month.value || (!activeMonth && month.value === 0)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {month.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

