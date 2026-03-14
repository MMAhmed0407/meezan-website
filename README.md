---

# Meezan Educational Institute — Website Documentation
> Built by A2S Labs

---
 
## 1. Project Overview
- **Client name and website**: www.meezanedu.com
- **Project purpose**: High-converting, premium multi-page website
- **Built by**: A2S Labs (Saif & Azeem)
- **Tech stack summary**: Next.js 14, React 19, Tailwind CSS 4, Framer Motion, Shadcn UI
- **Live URL**: https://meezan-website.vercel.app
- **Last updated date**: March 9, 2026

---

## 2. Tech Stack
Full list of every technology used:
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- Shadcn/UI
- Lucide React (icons)
- React CountUp (animated stats)
- Embla Carousel React (carousels/sliders)
- Tailwind Merge & CLSX (utility class dynamic merging)

---

## 3. Project Structure
A full annotated folder/file tree of the entire project:

```text
src/
  app/
    globals.css               # Global CSS variables, Tailwind configuration
    layout.tsx                # Root layout, loads fonts, metadata, Navbar, Footer
    page.tsx                  # Homepage linking all home sections
    about/
      page.tsx                # About Us page
    blog/
      page.tsx                # Blog listing page
      [slug]/
        page.tsx              # Dynamic individual blog post page
    courses/
      page.tsx                # Courses listing page with anchor sections
  components/
    global/
      AnnouncementBar.tsx     # Rotating announcement strip above navbar
      FloatingElements.tsx    # WhatsApp + Call Now floating widgets
      Footer.tsx              # Site-wide footer with newsletter signup
      Navbar.tsx              # Sticky navbar with mobile hamburger menu
    home/
      CategoriesSection.tsx   # Course categories
      ClinicSection.tsx       # Shoukath Ali Charitable Clinic info
      CoachingSection.tsx     # Specialized coaching programs
      ContactSection.tsx      # Contact form and address location
      HeroSection.tsx         # Main hero section with split layout
      ITCoursesSection.tsx    # Details of IT courses
      ITIntroSection.tsx      # Introduction to IT division
      LeadCaptureSection.tsx  # Call to Action / Lead generation
      StatsSection.tsx        # Animated numerical stats (react-countup)
      TeachersTrainingSection.tsx # Teacher's Training accordion
      TestimonialsSection.tsx # Reviews slider
      WhyChooseSection.tsx    # Why Choose Us features grid
```

---

## 4. Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage |
| `/courses` | `app/courses/page.tsx` | All courses listing |
| `/about` | `app/about/page.tsx` | About Us |
| `/blog` | `app/blog/page.tsx` | Blog listing |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |

---

## 5. Components Reference

### Global Components (`src/components/global/`)
- `Navbar.tsx`: Main site navigation. Uses `lucide-react` icons. Renders sticky header.
- `Footer.tsx`: Main site footer. Includes Quick Links, Contact details, Newsletter form.
- `AnnouncementBar.tsx`: Rotating top bar. Uses `framer-motion` to animate announcements.
- `FloatingElements.tsx`: Fixed floating action buttons for quick WhatsApp/Phone contact.

### Home Components (`src/components/home/`)
- `HeroSection.tsx`: Landing view with dual CTAs, brand teal aesthetics. Uses `framer-motion`.
- `StatsSection.tsx`: Uses `react-countup` to animate active students, teachers numbers.
- `CategoriesSection.tsx`: Displays various educational categories with icons.
- `WhyChooseSection.tsx`: Core value propositions.
- `TeachersTrainingSection.tsx`: Specialized teacher training info using Shadcn Accordion.
- `ClinicSection.tsx`: Social impact healthcare clinic info.
- `CoachingSection.tsx`: Info about coaching for competitive exams.
- `ITIntroSection.tsx`: Introduction to tech courses.
- `ITCoursesSection.tsx`: Specific IT course options.
- `TestimonialsSection.tsx`: Student feedback, animated carousel block.
- `LeadCaptureSection.tsx`: High-converting CTA block before footer.
- `ContactSection.tsx`: Embedded Google Map and Enquiry Form.

---

## 6. Brand & Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Brand Teal | `#00BCD4` | Primary color, hero, navbar |
| Dark Teal | `#0097A7` | Footer, hover states, sidebars |
| Deeper Teal | `#00838F` | Headings, accents, active states |
| Light Background | `#E0F7FA` | Alternate sections, muted elements |
| Page Background | `#FFFFFF` | Default background |
| Primary Text | `#1A1A2E` | Body text, sidebar items |
| Gold Accent | `#F5A623` | Badges, stars, highlights |
| Footer BG | `#0097A7` | Footer background |
| Accent | `#004D60` | Dark badges, tags, deep muted text |

### Typography
- **Font**: Poppins (Google Fonts via `next/font`)
- **H1**: 56px bold
- **H2**: 36px bold
- **H3**: 24px semibold
- **Body**: 16px regular

### Spacing & Layout
- **Max content width**: `max-w-7xl`
- **Section padding**: `py-20` / `py-24` desktop, `py-12` mobile
- **Border radius**: `rounded-2xl` / `rounded-3xl` on cards and images
- **Card shadow**: `shadow-md` → `shadow-xl` on hover

---

## 7. Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | Core React framework. |
| `react`, `react-dom` | 19.2.3 | Core UI building library. |
| `framer-motion` | ^12.35.1 | Complex interactions, page transitions, reveal animations. |
| `lucide-react` | ^0.577.0 | Clean, customizable SVG icons. |
| `clsx`, `tailwind-merge` | ^2.1.1, ^3.5.0 | Dynamic string merging for Tailwind class names. |
| `shadcn` | ^4.0.2 | Reusable accessible UI components (Accordion, etc). |
| `react-countup` | ^6.5.3 | Animating numerical statistics in the Stats section. |
| `embla-carousel-react` | ^8.6.0 | Base carousel logic. |
| `tw-animate-css` | ^1.4.0 | Additional Tailwind CSS animations. |

---

## 8. Environment Variables
*(Currently no environment variables are explicitly required for the frontend static build, but if added for backend features, they would go here).*

| Variable Name | Purpose | Required | Example |
|---------------|---------|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO | Optional | `https://www.meezanedu.com` |

---

## 9. Getting Started — Local Development

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm or pnpm or yarn
- Works across Windows, macOS, and Linux

### Installation
Run the following commands in your terminal to set up the project locally:

```bash
git clone <repository-url>
cd meezan-website
npm install
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build the application for production deployment |
| `npm run start` | Start the production server (run build first) |
| `npm run lint` | Run ESLint checks across the codebase |

---

## 10. Key Features & Sections
- **Sticky navbar**: Uses Framer Motion / state to track scroll and collapse hamburger menu.
- **Announcement bar**: Rotating text marquee with auto-play interval.
- **Hero section**: High contrast side-by-side layout with dynamic blur effects.
- **Animated stats counter**: Leverages `react-countup` and `framer-motion` `whileInView`.
- **Course cards**: Interactive micro-animations (`hover:-translate-y-1`, `shadow-xl`).
- **Contact form**: Uncontrolled form inputs mapping course interests to an inquiry submission.
- **WhatsApp floating button**: Fixed widget for instantaneous communication mapping to API links.
- **Dynamic Routing**: SSR and parameter handling for the `/blog/[slug]` route.

---

## 11. SEO & Performance
- **Metadata**: Standardized title, description, and OpenGraph tags in `layout.tsx`.
- **Images**: Uses Next.js `<Image />` component for automatic WebP/AVIF generation, lazy loading, and dimension optimization.
- **Fonts**: `next/font/google` optimizes Poppins by downloading it at build time to prevent Cumulative Layout Shift (CLS).

---

## 12. Deployment
- **Recommended platform**: Vercel
- **Build command**: `npm run build`
- **Output directory**: `.next`

### Vercel Deployment Steps
Ensure your Vercel CLI is installed, or deploy directly by linking the GitHub repo from the Vercel Dashboard.

```bash
npm install -g vercel
vercel
```
1. Follow the interactive prompts.
2. Link your custom domain (`www.meezanedu.com`) via the Vercel project settings area.

---

## 13. Known Issues & Fixes
- **Fixed:** `ContactSection.tsx` — Replaced the invalid `selected` attribute on a disabled `<option>` element with `defaultValue=""` on the parent `<select>` to resolve standard React warnings regarding uncontrolled component setup.
- **Fixed:** Overhauled the entire site’s initial Navy/Red color scheme to map perfectly to the Meezan Institute’s true Teal (`#00BCD4` / `#0097A7`) brand palette across Shadcn variables and all individual `src/` files.

---

## 14. Future Enhancements
Suggested improvements for future sprint cycles:
- **Student portal / login system**: User authentication via Supabase/NextAuth.
- **Online course enrollment**: Payment gateway integration (Stripe / Razorpay).
- **Admin dashboard**: Headless CMS implementation to manage blog posts and incoming inquiries.
- **Live chat integration**: Integrating an on-platform chat widget instead of purely redirecting to WhatsApp.
- **Google Analytics / Meta Pixel**: Easy integration via `next/third-parties`.
- **Multi-language support**: `next-intl` integration for English, Urdu, and Telugu support.
- **Email notification system**: SendGrid / Resend integration for the primary contact form.

---

## 15. Contact & Credits
- **Client**: Meezan Educational Institute, Hyderabad
- **Website**: www.meezanedu.com
- **Built by**: A2S Labs
- **Developers**: Saif & Azeem
- **Contact**: hello@a2slabs.com
- **Copyright**: © 2026 A2S Labs. All rights reserved.

---
