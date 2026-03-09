import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import AnnouncementBar from "@/components/global/AnnouncementBar";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import FloatingElements from "@/components/global/FloatingElements";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meezan Educational Institute | Encourage to Educate to Empower",
  description: "Meezan Educational Institute: Encourage to Educate to Empower. Hyderabad's leading institution for Paramedical Sciences, IT Courses, and Professional Development.",
  openGraph: {
    title: "Meezan Educational Institute | Encourage to Educate to Empower",
    description: "Empowering careers through Paramedical, IT, and Professional education in Hyderabad. Encourage to Educate to Empower.",
    url: "https://www.meezanedu.com",
    siteName: "Meezan Educational Institute",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Meezan Educational Institute",
  url: "https://www.meezanedu.com",
  telephone: ["+919010186447", "+917730019572", "+914045131341"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "201, Second Floor, Dorato Avenue",
    addressLocality: "Hyderabad",
    addressCountry: "India",
  },
  openingHours: "Mo-Sa 09:00-20:00",
  sameAs: ["https://www.facebook.com/share/166FToduKR/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased text-foreground bg-background selection:bg-brand-teal/20 selection:text-brand-deeper-teal overflow-x-hidden flex flex-col min-h-screen`}>
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
        <FloatingElements />
      </body>
    </html>
  );
}
