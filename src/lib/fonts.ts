import { Faustina, Lato, Cantata_One } from 'next/font/google'

// Serif body — warm, gentle, readable. Quaker-appropriate plainness.
export const faustina = Faustina({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-faustina',
  weight: ['400', '500', '600'],
})

// Sans for nav, captions, small labels
export const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  weight: ['400', '700'],
})

// Display serif for the meeting name and section titles
export const cantataOne = Cantata_One({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cantata-one',
  weight: '400',
})
