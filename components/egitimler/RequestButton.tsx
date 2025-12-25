import Button from '@/components/ui/Button'

interface RequestButtonProps {
  requestLink?: string
  deliveryMethod?: string
  className?: string
}

export default function RequestButton({ requestLink, deliveryMethod, className = '' }: RequestButtonProps) {
  if (!requestLink) {
    return (
      <Button
        href="/iletisim"
        variant="primary"
        size="lg"
        className={className}
      >
        İletişime Geç
      </Button>
    )
  }

  // Eğer external link ise (http/https ile başlıyorsa)
  if (requestLink.startsWith('http://') || requestLink.startsWith('https://')) {
    return (
      <Button
        href={requestLink}
        variant="primary"
        size="lg"
        className={className}
      >
        Talep Et
      </Button>
    )
  }

  // Eğer form linki ise
  if (requestLink.startsWith('/')) {
    return (
      <Button
        href={requestLink}
        variant="primary"
        size="lg"
        className={className}
      >
        Talep Et
      </Button>
    )
  }

  // Diğer durumlar için
  return (
    <Button
      href={`/iletisim?egitim=${encodeURIComponent(requestLink)}`}
      variant="primary"
      size="lg"
      className={className}
    >
      Talep Et
    </Button>
  )
}

