export const runtime = 'edge';

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse all courses at Meezan Educational Institute — paramedic, home healthcare, psychology, teacher training, IT, and coaching. Classroom and online options in Hyderabad.',
  alternates: { canonical: 'https://meezanedu.com/courses' },
  openGraph: { url: 'https://meezanedu.com/courses' },
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
