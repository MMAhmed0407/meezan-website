import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


import { Analytics } from "@vercel/analytics/react";
import { LocalBusinessSchema } from "@/components/global/SchemaOrg";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meezan Educational Institute | Encourage to Educate to Empower",
  description: "Meezan Educational Institute: Encourage to Educate to Empower. Hyderabad's leading institution for Paramedical Sciences, Teacher Training, and Professional Development.",
  openGraph: {
    title: "Meezan Educational Institute | Encourage to Educate to Empower",
    description: "Empowering careers through Paramedical, Teacher Training, and Professional education in Hyderabad. Encourage to Educate to Empower.",
    url: "https://www.meezanedu.com",
    siteName: "Meezan Educational Institute",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessSchema />
      </head>
      <body className={`${poppins.variable} font-sans antialiased text-foreground bg-background selection:bg-brand-teal/20 selection:text-brand-deeper-teal overflow-x-hidden flex flex-col min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
