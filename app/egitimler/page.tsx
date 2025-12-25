import { Suspense } from 'react'
import { getTrainings, getTrainingCategories } from '@/lib/payload/queries'
import TrainingList from '@/components/egitimler/TrainingList'
import TrainingFilters from '@/components/egitimler/TrainingFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eğitimler',
  description: 'Kurumsal eğitimler, atölyeler ve online eğitim programları',
}

interface TrainingsPageProps {
  searchParams: {
    kategori?: string
    seviye?: string
    page?: string
  }
}

export default async function TrainingsPage({ searchParams }: TrainingsPageProps) {
  const category = searchParams.kategori
  const level = searchParams.seviye
  const page = parseInt(searchParams.page || '1', 10)

  const [trainingsResult, categories] = await Promise.all([
    getTrainings({
      limit: 12,
      page,
      category: category || undefined,
    }),
    getTrainingCategories(),
  ])

  // Filter by level on client side if needed (or add to query)
  let filteredTrainings = trainingsResult.docs
  if (level) {
    filteredTrainings = filteredTrainings.filter((training: any) => training.level === level)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Eğitimler</h1>
          <p className="text-lg text-gray-600">
            Kurumsal eğitimler, atölyeler ve online eğitim programları
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <TrainingFilters
              categories={categories}
              activeCategory={category}
              activeLevel={level}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {(category || level) && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {category && (
                    <span>
                      Kategori: <span className="font-semibold">{categories.find((c: any) => c.slug === category)?.name}</span>
                    </span>
                  )}
                  {category && level && ' • '}
                  {level && (
                    <span>
                      Seviye: <span className="font-semibold">
                        {level === 'beginner' ? 'Başlangıç' : level === 'intermediate' ? 'Orta' : 'İleri'}
                      </span>
                    </span>
                  )}
                  {' • '}
                  <span className="font-semibold">{filteredTrainings.length}</span> eğitim bulundu
                </p>
              </div>
            )}

            <TrainingList trainings={filteredTrainings} />

            {/* Pagination */}
            {trainingsResult.totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {page > 1 && (
                  <a
                    href={`/egitimler?page=${page - 1}${category ? `&kategori=${category}` : ''}${level ? `&seviye=${level}` : ''}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Önceki
                  </a>
                )}
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                  Sayfa {page} / {trainingsResult.totalPages}
                </span>
                {page < trainingsResult.totalPages && (
                  <a
                    href={`/egitimler?page=${page + 1}${category ? `&kategori=${category}` : ''}${level ? `&seviye=${level}` : ''}`}
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

