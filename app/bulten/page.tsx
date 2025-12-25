import { Suspense } from 'react'
import { getNewsletters, getNewsletterYears } from '@/lib/payload/queries'
import NewsletterList from '@/components/newsletter/NewsletterList'
import NewsletterFilters from '@/components/newsletter/NewsletterFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bülten Arşivi',
  description: 'Geçmiş bültenler ve indirilebilir içerikler',
}

interface NewsletterPageProps {
  searchParams: {
    yil?: string
    ay?: string
    page?: string
  }
}

export default async function NewsletterPage({ searchParams }: NewsletterPageProps) {
  const year = searchParams.yil ? parseInt(searchParams.yil, 10) : undefined
  const month = searchParams.ay ? parseInt(searchParams.ay, 10) : undefined
  const page = parseInt(searchParams.page || '1', 10)

  const [newslettersResult, years] = await Promise.all([
    getNewsletters({
      limit: 12,
      page,
      year,
      month,
    }),
    getNewsletterYears(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bülten Arşivi</h1>
          <p className="text-lg text-gray-600">
            Geçmiş bültenler ve indirilebilir içerikler
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<div>Yükleniyor...</div>}>
              <NewsletterFilters
                years={years}
                activeYear={year}
                activeMonth={month}
              />
            </Suspense>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {(year || month) && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {year && (
                    <span>
                      Yıl: <span className="font-semibold">{year}</span>
                    </span>
                  )}
                  {year && month && ' • '}
                  {month && (
                    <span>
                      Ay: <span className="font-semibold">
                        {month === 1 ? 'Ocak' : month === 2 ? 'Şubat' : month === 3 ? 'Mart' : 
                         month === 4 ? 'Nisan' : month === 5 ? 'Mayıs' : month === 6 ? 'Haziran' :
                         month === 7 ? 'Temmuz' : month === 8 ? 'Ağustos' : month === 9 ? 'Eylül' :
                         month === 10 ? 'Ekim' : month === 11 ? 'Kasım' : 'Aralık'}
                      </span>
                    </span>
                  )}
                  {' • '}
                  <span className="font-semibold">{newslettersResult.totalDocs}</span> bülten bulundu
                </p>
              </div>
            )}

            <NewsletterList newsletters={newslettersResult.docs} />

            {/* Pagination */}
            {newslettersResult.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {page > 1 && (
                  <a
                    href={`/bulten?page=${page - 1}${year ? `&yil=${year}` : ''}${month ? `&ay=${month}` : ''}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Önceki
                  </a>
                )}
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Sayfa {page} / {newslettersResult.totalPages}
                </span>
                {page < newslettersResult.totalPages && (
                  <a
                    href={`/bulten?page=${page + 1}${year ? `&yil=${year}` : ''}${month ? `&ay=${month}` : ''}`}
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

