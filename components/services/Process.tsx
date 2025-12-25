interface ProcessStep {
  step: number
  title: string
  description?: string
}

interface ProcessProps {
  process: ProcessStep[]
}

export default function Process({ process }: ProcessProps) {
  if (!process || process.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Süreç</h2>
      <div className="space-y-6">
        {process.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.step || index + 1}
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              {step.description && (
                <p className="text-gray-600">{step.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

