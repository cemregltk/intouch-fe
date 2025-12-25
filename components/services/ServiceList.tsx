import ServiceCard from './ServiceCard'

interface ServiceListProps {
  services: any[]
  emptyMessage?: string
}

export default function ServiceList({ services, emptyMessage = 'Henüz hizmet bulunmamaktadır.' }: ServiceListProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}

