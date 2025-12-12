import { Microchip, Server, Shield } from 'lucide-react'

const teams = [
  { icon: Microchip, name: 'AI Platform & ML Infra' },
  { icon: Shield, name: 'Security / Risk' },
  { icon: Server, name: 'Storage & Infra' },
]

export function TeamsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Built for These Teams</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {teams.map((team) => (
            <div
              key={team.name}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-gray-200 shadow-sm"
            >
              <team.icon className="h-5 w-5 text-gray-700" />
              <span className="font-medium text-gray-900">{team.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
