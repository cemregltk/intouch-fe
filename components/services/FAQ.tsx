'use client'

import { useState } from 'react'
import RichText from '@/components/blog/RichText'

interface FAQItem {
  question: string
  answer: any // RichText content
}

interface FAQProps {
  faq: FAQItem[]
}

export default function FAQ({ faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faq || faq.length === 0) {
    return null
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Sık Sorulan Sorular</h2>
      <div className="space-y-4">
        {faq.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <RichText content={item.answer} className="text-gray-700" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

