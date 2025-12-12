'use client'

import { ArrowRight } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/lib/react/components/ui/button'

export function FinalCTASection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 via-transparent to-gray-700/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to automate your email analysis?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Create your first reviewer in under a minute. No credit card required.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Button
              size="lg"
              className="h-12 px-8 bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/sign-up">
                Get Started - it&apos;s free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
