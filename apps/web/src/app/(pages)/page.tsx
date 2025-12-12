'use client'

import {
  ArchitectureSection,
  BenefitsSection,
  CTASection,
  HeroSection,
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
