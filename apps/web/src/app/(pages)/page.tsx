'use client'

import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  ChartLine,
  Cloud,
  Crosshair,
  Database,
  EyeOff,
  FileText,
  Key,
  Lock,
  MessageSquare,
  Microchip,
  Network,
  PenTool,
  Plug,
  Search,
  Server,
  Shield,
  Workflow,
} from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/lib/react/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ArchitectureSection />
      <BenefitsSection />
      <WhyStrataSection />
      <TeamsSection />
      <CTASection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Unlock Your File Shares for Safe, Auditable, More Capable AI
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Strata is the AI-native data layer for NFS/SMB.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-primary to-gray-800 hover:from-primary/90 hover:to-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="#cta">
                Request a discovery call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8" asChild>
              <Link href="#cta">Join the design-partner waitlist</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Private design-partner program for teams running internal AI hubs over large file
            estates.
          </p>
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  return (
    <section className="relative py-24 architecture-bg overflow-hidden">
      {/* Grid background overlay */}
      <div className="absolute inset-0 architecture-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How Strata Fits Between Storage and AI
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Connect a few high-value NFS/SMB shares, and Strata turns them into a semantic,
            policy-aware data plane that your AI hubs and agents can call.
          </p>
        </div>

        {/* Architecture Diagram - Three columns with flow lines */}
        <div className="relative mb-16">
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 relative">
            {/* Enterprise File Estates */}
            <div className="flex-1 flex flex-col items-center lg:items-end justify-center gap-8 relative z-20 py-10">
              <h3 className="text-xl font-bold text-white absolute top-0 right-0 w-full text-center lg:text-right lg:pr-4">
                Enterprise File Estates
              </h3>

              <div className="flex flex-col items-center lg:items-end gap-2 w-full lg:pr-8 relative">
                <span className="text-slate-400 text-sm font-medium mb-2">On-prem + hybrid infra</span>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="glass-card-dark p-4 rounded-xl w-28 h-20 flex items-center justify-center mb-2 bg-[#0f172a]">
                      <Server className="h-8 w-8 text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-300 text-center max-w-[100px]">File Servers & NAS</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="glass-card-dark p-4 rounded-xl w-28 h-20 flex items-center justify-center mb-2 bg-[#0f172a]">
                      <Network className="h-8 w-8 text-purple-400" />
                    </div>
                    <span className="text-xs text-slate-300 text-center max-w-[100px]">Hybrid Gateways</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-2 w-full lg:pr-8 relative">
                <span className="text-slate-400 text-sm font-medium mb-2">Cloud file platforms</span>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="glass-card-dark p-3 rounded-xl w-20 h-16 flex items-center justify-center mb-2 bg-[#0f172a]">
                      <Cloud className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-300 text-center">Cloud Files</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="glass-card-dark p-3 rounded-xl w-20 h-16 flex items-center justify-center mb-2 bg-[#0f172a]">
                      <Database className="h-6 w-6 text-purple-400" />
                    </div>
                    <span className="text-xs text-slate-300 text-center">Object Storage</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="glass-card-dark p-3 rounded-xl w-20 h-16 flex items-center justify-center mb-2 bg-[#0f172a]">
                      <Cloud className="h-6 w-6 text-pink-400" />
                    </div>
                    <span className="text-xs text-slate-300 text-center">SaaS Drives</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Connector */}
            <div className="hidden lg:block w-[120px] relative -top-20 z-0">
              <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'scale(1.3)' }}>
                <defs>
                  <linearGradient id="flowGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path
                  d="M-80 180 C 20 180, 60 300, 160 300"
                  fill="none"
                  stroke="url(#flowGradientLeft)"
                  strokeWidth="2.5"
                  className="flow-path"
                  opacity="0.7"
                />
                <path
                  d="M-80 420 C 20 420, 60 300, 160 300"
                  fill="none"
                  stroke="url(#flowGradientLeft)"
                  strokeWidth="2.5"
                  className="flow-path"
                  opacity="0.7"
                  style={{ animationDelay: '0.5s' }}
                />
              </svg>
            </div>

            {/* Strata Data Plane */}
            <div className="flex-[1.5] w-full max-w-2xl px-4 py-8 relative flex flex-col items-center justify-center z-20">
              <h3 className="text-xl font-bold text-white mb-6 text-center absolute top-0">
                Strata Data Plane
              </h3>

              <div className="glass-panel rounded-[2rem] p-8 lg:p-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="glass-card-dark p-5 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <FileText className="h-6 w-6 text-purple-300" />
                    </div>
                    <p className="text-sm font-semibold text-white">Semantic & Risk Model</p>
                  </div>
                  <div className="glass-card-dark p-5 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <Shield className="h-6 w-6 text-blue-300" />
                    </div>
                    <p className="text-sm font-semibold text-white">ACL Enforcement & Redaction</p>
                  </div>
                  <div className="glass-card-dark p-5 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-3 border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                      <Brain className="h-6 w-6 text-pink-300" />
                    </div>
                    <p className="text-sm font-semibold text-white">Type-Aware Chunking</p>
                  </div>
                  <div className="glass-card-dark p-5 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <Crosshair className="h-6 w-6 text-emerald-300" />
                    </div>
                    <p className="text-sm font-semibold text-white">Observability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Connector */}
            <div className="hidden lg:block w-[120px] relative -top-20 z-0">
              <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ transform: 'scale(1.3)' }}>
                <defs>
                  <linearGradient id="flowGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <path
                  d="M-60 300 C 40 300, 80 180, 180 180"
                  fill="none"
                  stroke="url(#flowGradientRight)"
                  strokeWidth="2.5"
                  className="flow-path"
                  opacity="0.7"
                />
                <path
                  d="M-60 300 C 40 300, 80 420, 180 420"
                  fill="none"
                  stroke="url(#flowGradientRight)"
                  strokeWidth="2.5"
                  className="flow-path"
                  opacity="0.7"
                  style={{ animationDelay: '0.5s' }}
                />
              </svg>
            </div>

            {/* AI Agents & Copilots */}
            <div className="flex-1 flex flex-col items-center lg:items-start justify-center gap-8 relative z-20 py-10 lg:pl-4">
              <h3 className="text-xl font-bold text-white absolute top-0 left-0 w-full text-center lg:text-left lg:pl-4">
                AI Agents & Copilots
              </h3>

              <div className="flex items-center gap-4 w-full">
                <div className="glass-card-dark w-14 h-14 rounded-2xl flex items-center justify-center border-l-4 border-l-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-[#0f172a]">
                  <MessageSquare className="h-7 w-7 text-purple-400" />
                </div>
                <span className="font-bold text-white text-lg">Agentic Workflows</span>
              </div>

              <div className="flex items-center gap-4 w-full">
                <div className="glass-card-dark w-14 h-14 rounded-2xl flex items-center justify-center border-l-4 border-l-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] bg-[#0f172a]">
                  <Bot className="h-7 w-7 text-emerald-400" />
                </div>
                <div>
                  <span className="font-bold text-white text-lg">AI Hubs</span>
                  <p className="text-sm text-slate-400">(e.g., ChatGPT Enterprise)</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
                Agents call Strata through ACL-aware, purpose-built tools, like{' '}
                <span className="text-slate-300">Search</span>,{' '}
                <span className="text-slate-300">Read</span>,{' '}
                <span className="text-slate-300">Summarize</span>, and{' '}
                <span className="text-slate-300">Propose Remediation</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Three Pillars */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 mb-4">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Live ACL & Policy Enforcement
            </h3>
            <p className="text-sm text-slate-400">
              Every query is evaluated against file-system ACLs and org policies before any content
              is returned.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 mb-4">
              <EyeOff className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Semantic Risk & Redaction</h3>
            <p className="text-sm text-slate-400">
              Detects sensitive content and returns raw, redacted, or summarized views per agent and
              identity.
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 mb-4">
              <ChartLine className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Full Observability</h3>
            <p className="text-sm text-slate-400">
              Structured logs of which agent accessed which documents, under which policy, and why.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
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
        "Agents can search, read, summarize, and propose remediation over SMB/NFS using Strata's tools, not ad-hoc scripts.",
    },
    {
      icon: Shield,
      title: 'Safety by default',
      description:
        "Agents feel smarter because they see more of the right context—not because they've escaped your guardrails.",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Make Your Existing Agents Actually Useful on File Data
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

function WhyStrataSection() {
  const strataFeatures = [
    'Aligns 1:1 with live file-system ACLs and your IdP; no shadow permission model',
    'Understands document types and flags PII, financials, and secrets across shares',
    'Per-agent policies decide who gets raw text, redacted snippets, or summaries',
    'Simple APIs your internal GPT, Copilot, or agent framework can call',
  ]

  const withoutStrata = [
    'Manual copy-paste of file contents into AI tools',
    'No permission enforcement—users see everything or nothing',
    'Sensitive data exposed without redaction controls',
  ]

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold">Why Teams Use Strata</h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Connect your file estates once, and every AI agent gets secure, policy-aware access to
            the documents they need.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* With Strata */}
          <div className="bg-gray-800 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">With Strata</h3>
            <ul className="space-y-4">
              {strataFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Without Strata */}
          <div className="bg-gray-800/50 rounded p-6">
            <h3 className="text-lg font-semibold mb-6 text-gray-400">Without Strata</h3>
            <ul className="space-y-4">
              {withoutStrata.map((drawback) => (
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

function TeamsSection() {
  const teams = [
    { icon: Microchip, name: 'AI Platform & ML Infra' },
    { icon: Shield, name: 'Security / Risk' },
    { icon: Server, name: 'Storage & Infra' },
  ]

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

function CTASection() {
  return (
    <section
      id="cta"
      className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-transparent to-gray-700/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Become a Design Partner
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            We&apos;re working with a small number of organizations that have sizable SMB/NFS/NAS
            estates, are rolling out internal AI hubs, and need a safe, auditable way for agents to
            use file data.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="mailto:founder@strataplane.dev">
                Apply to the design-partner program
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Or email{' '}
            <a href="mailto:founder@strataplane.dev" className="text-white hover:underline">
              founder@strataplane.dev
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
