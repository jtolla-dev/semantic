import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { LayoutWrapper } from '@/lib/react/components/layout/layout-wrapper'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: 'Strata – AI-Native Data Layer for NFS/SMB',
  description:
    'Unlock your file shares for safe, auditable, more capable AI. Strata is the semantic and safety data plane for enterprise file systems.',
  keywords: [
    'AI data layer',
    'NFS SMB AI',
    'enterprise file AI',
    'AI file governance',
    'semantic file layer',
    'AI policy enforcement',
    'file system AI',
    'enterprise AI security',
    'RAG file systems',
    'AI document governance',
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    title: 'Strata – AI-Native Data Layer for NFS/SMB',
    description:
      'Unlock your file shares for safe, auditable, more capable AI. Strata is the semantic and safety data plane for enterprise file systems.',
    url: 'https://strataplane.dev',
    siteName: 'Strata',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Strata AI Data Layer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strata – AI-Native Data Layer for NFS/SMB',
    description:
      'Unlock your file shares for safe, auditable, more capable AI. Strata is the semantic and safety data plane for enterprise file systems.',
    images: ['/og-image.png'],
    creator: '@strataplane',
    site: '@strataplane',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
