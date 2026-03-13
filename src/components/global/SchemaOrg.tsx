export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Meezan Educational Institute",
    "alternateName": "Meezaan Education Society",
    "url": "https://meezanedu.com",
    "logo": "https://meezanedu.com/images/meezan-logo.png",
    "image": "https://meezanedu.com/og-image.jpg",
    "description": "Training and coaching institute in Hyderabad offering paramedic, healthcare, psychology, teacher training, and professional development courses.",
    "telephone": ["+919010186447", "+917730019572"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "201, Second Floor, Dorato Avenue",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": ["https://www.facebook.com/share/166FToduKR/"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Courses at Meezan",
      "itemListElement": [
        { "@type": "Course", "name": "Paramedic & Health Services" },
        { "@type": "Course", "name": "Home Healthcare Training" },
        { "@type": "Course", "name": "Psychology Courses" },
        { "@type": "Course", "name": "Teacher Training — ECCE, ASD, Life Skills" },

        { "@type": "Course", "name": "Personal Coaching & Leadership" }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What courses does Meezan Educational Institute offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Meezan offers paramedic and health services, home healthcare, psychology, teacher training (ECCE, ASD, Life Skills, ADHD), management consulting, counselling, and personal coaching programs including leadership and public speaking."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Meezan Educational Institute located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Meezan is located at 201, Second Floor, Dorato Avenue, Hyderabad, Telangana. We are open Monday to Saturday from 9am to 8pm."
        }
      },
      {
        "@type": "Question",
        "name": "Does Meezan offer online courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Meezan offers online, offline, and hybrid learning options depending on the course. Contact us on WhatsApp at 7730019572 for details on specific course formats."
        }
      },
      {
        "@type": "Question",
        "name": "How do I enroll at Meezan Educational Institute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can enroll by filling out the enquiry form on our website, calling us at 9010186447, or messaging us on WhatsApp at 7730019572. Our team will guide you through the admission process."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Shoukath Ali Charitable Clinic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Shoukath Ali Charitable Clinic is a free healthcare service run by Meezan Educational Institute, providing medical support to underserved communities in Hyderabad under the guidance of Mrs. Zaibunnissa."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbProps {
  crumbs: { name: string; url: string }[];
}

export function BreadcrumbSchema({ crumbs }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://meezanedu.com${crumb.url === '/' ? '' : crumb.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
