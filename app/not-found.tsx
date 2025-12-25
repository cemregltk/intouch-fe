import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ROUTES } from '@/lib/constants/routes'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href={ROUTES.HOME} variant="primary">
            Ana Sayfaya Dön
          </Button>
          <Button href={ROUTES.BLOG} variant="outline">
            Blog'a Git
          </Button>
        </div>
      </div>
    </div>
  )
}

