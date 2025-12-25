'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kritik Hata</h1>
            <p className="text-gray-600 mb-8">
              Üzgünüz, uygulamada kritik bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

