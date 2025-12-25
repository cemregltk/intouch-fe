import TrainingCard from './TrainingCard'

interface TrainingListProps {
  trainings: any[]
  emptyMessage?: string
}

export default function TrainingList({ trainings, emptyMessage = 'Henüz eğitim bulunmamaktadır.' }: TrainingListProps) {
  if (!trainings || trainings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings.map((training) => (
        <TrainingCard key={training.id} training={training} />
      ))}
    </div>
  )
}

