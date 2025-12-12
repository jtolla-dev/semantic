'use client'

import { Mail, Plug, Users } from 'lucide-react'

const features = [
  {
    icon: Plug,
    title: 'No API keys or extensions',
    description: (
      <>
        <strong>Nothing to install.</strong> No OAuth flows, no browser add-ons.
      </>
    ),
  },
  {
    icon: Mail,
    title: 'Works with anything that sends email',
    description: (
      <>
        <strong>ATS exports, web forms, shared inboxes, or people</strong> can all BCC a Pillar
        reviewer.
      </>
    ),
  },
  {
    icon: Users,
    title: 'One address per reviewer',
    description: (
      <>
        <strong>Share it with your team once;</strong> everyone gets the same rubric-based review
        every time.
      </>
    ),
  },
]

export function EmailNativeSection() {
  return (
    <section className="pb-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Email-native, zero integration work</h2>
          <p className="mt-3 text-gray-600">
            Pillar meets you where your work already happens: email.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 mb-4">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
