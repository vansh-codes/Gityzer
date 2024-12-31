import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: {
    template: '%s | Gityzer',
    default: 'Gityzer',
  },
  metadataBase: new URL('https://gityzer.vercel.app'), // canonical link
  description: 'Gityzer is an open-source tool that generates a personalized image summarizing a user\'s GitHub stats. This image can be easily embedded in GitHub README files, helping developers showcase their contributions, coding activity, and overall GitHub presence.',
  referrer: 'origin-when-cross-origin',
  keywords: ['Bridgewise-tech', 'tech'],
  icons: {
    icon: [
      { url: '/assets/logo/favicon-16x16.png' },
      new URL('/assets/logo/favicon-16x16.png', 'https://gityzer.vercel.app'),
      { url: '/assets/logo/favicon-16x16.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [
      { url: '/assets/logo/apple-touch-icon.png' },
      { url: '/assets/logo/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gityzer',
    description: 'Gityzer is an open-source tool that generates a personalized image summarizing a user\'s GitHub stats. This image can be easily embedded in GitHub README files, helping developers showcase their contributions, coding activity, and overall GitHub presence.',
    creator: '@nextjs',
    images: ['https://gityzer.vercel.app/logo/logo.png'], // Must be an absolute URL
  },
  verification: {
    google: 'google',
  },
  assets: ['https://gityzer.vercel.app/assets'], // url for all assets
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
