import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Meezan Educational Institute — our mission to educate and empower students in Hyderabad through healthcare, psychology, and skills training.',
  alternates: { canonical: 'https://meezanedu.com/about' },
  openGraph: { url: 'https://meezanedu.com/about' },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
