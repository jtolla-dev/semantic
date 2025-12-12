'use client'

import { Check, X } from 'lucide-react'

const pillarBenefits = [
  'Rubric-based Reviewers with their own email addresses',
  'Works with anything that can send email (ATS, forms, people)',
  'Automatic Submission ↔ Review history for audit and export',
  'Non-technical users just BCC an address',
]

const gptDrawbacks = [
  'Someone still has to paste each submission into the chat',
  'Reviews live as unstructured chat history, not a system of record',
  'Triggering from other tools requires separate automation',
]

export function ComparisonSection() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Better than generic AI chats or custom GPTs</h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Set up a reviewer once, give it an email address, and every submission gets the same
            structured review—automatically logged in one place.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* With Pillar */}
          <div className="bg-gray-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">With Pillar</h3>
            <ul className="space-y-4">
              {pillarBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With GPTs alone */}
          <div className="bg-gray-800/50 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-400">With GPTs alone</h3>
            <ul className="space-y-4">
              {gptDrawbacks.map((drawback) => (
                <li key={drawback} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">{drawback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          Even if you&apos;ve built custom GPTs,{' '}
          <strong>
            Pillar attaches your rubric directly to the workflows you already run over email
          </strong>
          —and keeps every submission and review in one place.
        </p>
      </div>
    </section>
  )
}
