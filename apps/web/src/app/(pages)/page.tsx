'use client'

import {
  ArchitectureSection,
  BenefitsSection,
  CTASection,
  HeroSection,
  TeamsSection,
  WhyStrataSection,
} from '@/lib/react/components/views/landing'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <ArchitectureSection />
      <BenefitsSection />
      <CTASection />
    </div>
  )
}
