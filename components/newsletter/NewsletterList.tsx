import NewsletterCard from './NewsletterCard'

interface NewsletterListProps {
  newsletters: any[]
  emptyMessage?: string
}

export default function NewsletterList({ newsletters, emptyMessage = 'Henüz bülten bulunmamaktadır.' }: NewsletterListProps) {
  if (!newsletters || newsletters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsletters.map((newsletter) => (
        <NewsletterCard key={newsletter.id} newsletter={newsletter} />
      ))}
    </div>
  )
}

