'use client'

import { Check, HelpCircle } from 'lucide-react'

import Link from 'next/link'

import { Button } from '@/lib/react/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/react/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/lib/react/components/ui/tooltip'

interface PricingTier {
  name: string
  description: string
  price: string
  period?: string
  features: string[]
  cta: string
  ctaLink: string
  popular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    description: 'For trying Pillar on a single workflow.',
    price: '$0',
    period: '/ month',
    features: ['20 reviews per month', '1 reviewer', 'Email support'],
    cta: 'Get Started',
    ctaLink: '/sign-up',
  },
  {
    name: 'Plus',
    description: 'For serious use across multiple workflows.',
    price: '$19',
    period: '/ month',
    features: ['Unlimited reviews', 'Unlimited reviewers', 'Priority support'],
    cta: 'Upgrade to Plus',
    ctaLink: '/sign-up?plan=plus',
    popular: true,
  },
]

export function FullPricingSection() {
  return (
    <section id="pricing" className="relative py-24 bg-gray-50">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">Start free, upgrade when you need more.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.popular ? 'ring-2 ring-primary shadow-lg relative' : ''}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-gray-500 ml-1">{tier.period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                      {feature.includes('reviews per month') && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 shrink-0 mt-0.5 cursor-default" />
                          </TooltipTrigger>
                          <TooltipContent>
                            A review is one email processed by one of your AI reviewers.
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={tier.popular ? 'default' : 'outline'} asChild>
                  <Link href={tier.ctaLink}>{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
