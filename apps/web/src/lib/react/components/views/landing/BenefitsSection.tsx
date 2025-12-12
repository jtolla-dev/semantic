import { MessageSquare, Shield, Workflow } from 'lucide-react'

const benefits = [
  {
    icon: MessageSquare,
    title: 'Deeper answers',
    description:
      '"Find the latest signed MSA with Acme and highlight what changed from the previous version."',
  },
  {
    icon: Workflow,
    title: 'Richer workflows',
    description:
      "Agents can search, read, summarize, and propose remediation over SMB/NFS using Topos's ACL-aware tools",
  },
  {
    icon: Shield,
    title: 'Safety by default',
    description:
      "Agents feel smarter because they see more of the right context—not because they've escaped your guardrails.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Make your existing agents actually useful on file data
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-700 mb-4">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
