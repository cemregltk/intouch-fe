interface Package {
  name: string
  description?: string
  duration?: string
  price?: number
}

interface PackagesProps {
  packages: Package[]
}

export default function Packages({ packages }: PackagesProps) {
  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Paketler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 transition-colors"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {pkg.name}
            </h3>
            {pkg.description && (
              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
            )}
            <div className="flex items-center justify-between">
              {pkg.duration && (
                <span className="text-sm text-gray-500">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pkg.duration}
                </span>
              )}
              {pkg.price !== undefined && pkg.price !== null && (
                <span className="text-lg font-bold text-blue-600">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(pkg.price)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

