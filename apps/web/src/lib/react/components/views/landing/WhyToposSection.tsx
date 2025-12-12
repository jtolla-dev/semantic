import { Check, EyeOff, FileText, Key, Lock, Plug } from 'lucide-react'

const toposFeatures = [
  'Aligns 1:1 with live file-system ACLs and your IdP; no shadow permission model',
  'Understands document types and flags PII, financials, and secrets across shares',
  'Per-agent policies decide who gets raw text, redacted snippets, or summaries',
  'Simple APIs your internal GPT, Copilot, or agent framework can call',
]

const withoutTopos = [
  'Manual copy-paste of file contents into AI tools',
  'No permission enforcement—users see everything or nothing',
  'Sensitive data exposed without redaction controls',
]

export function WhyToposSection() {
  return (
    <section className="relative py-24 architecture-bg text-white overflow-hidden">
      <div className="absolute inset-0 architecture-grid pointer-events-none" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Why Teams Use Topos</h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Connect your file estates once, and every AI agent gets secure, policy-aware access to
            the documents they need.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* With Topos */}
          <div className="bg-gray-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">With Topos</h3>
            <ul className="space-y-4">
              {toposFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Without Topos */}
          <div className="bg-gray-800/50 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-400">Without Topos</h3>
            <ul className="space-y-4">
              {withoutTopos.map((drawback) => (
                <li key={drawback} className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                  <span className="text-gray-400">{drawback}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <div className="text-center">
            <Key className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium">ACL-accurate retrieval</p>
          </div>
          <div className="text-center">
            <FileText className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium">Semantic indexing</p>
          </div>
          <div className="text-center">
            <EyeOff className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <p className="text-sm font-medium">Policy-bound access</p>
          </div>
          <div className="text-center">
            <Plug className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-medium">Plug-and-play APIs</p>
          </div>
        </div>
      </div>
    </section>
  )
}
