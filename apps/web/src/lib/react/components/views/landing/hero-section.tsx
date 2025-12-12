'use client'

import { ArrowRight } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/lib/react/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Quickly turn emails into AI-powered insights
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Create a reviewer, send emails to its unique address, and get instant AI-generated
            reviews for candidate screening, grading, and inbox triage.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-primary to-gray-800 hover:from-primary/90 hover:to-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">
                Get Started - it&apos;s free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-16">
            <Image
              src="/pillar-screenshot.png"
              alt="Pillar application screenshot"
              width={1200}
              height={800}
              className="rounded shadow-2xl border border-gray-200"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
