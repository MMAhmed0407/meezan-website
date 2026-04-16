---

# Meezan Educational Institute — Website Documentation
> Built by A2S Labs

---
 
## 1. Project Overview
- **Client name and website**: www.meezanedu.com
- **Project purpose**: High-converting, premium multi-page website
- **Architecture**: Hardened Static-First Next.js Application with ISR (Incremental Static Regeneration).
- **Built by**: A2S Labs (Saif & Azeem)
- **Live URL**: https://meezan-website.vercel.app
- **Last updated date**: April 17, 2026

---

## 2. Tech Stack
Full list of every core technology used:
- **Framework**: Next.js 16.1.6 (Turbopack)
- **React**: React 19.2.3
- **Language**: TypeScript 5
- **Styling/UI**: Tailwind CSS 4, Framer Motion, Shadcn UI
- **Icons & Animation**: Lucide React, React CountUp, Embla Carousel React
- **Database/Auth**: Supabase (Scoped/Optimized)
- **Hosting**: Netlify (using Credit-Based pricing optimizations)

---

## 3. Core Route Rendering Architecture
To guarantee maximum global performance and zero computational waste, the core architecture heavily utilizes Next.js native caching paradigms:

| Route | Render Type | Description |
|-------|-------------|-------------|
| `/` | `○ Static` | Prerendered Homepage |
| `/about`, `/courses` | `○ Static` | Core informational pages |
| `/blog` | `○ Static (ISR)` | Blog index, revalidates every 1 day (`revalidate: 86400`) |
| `/blog/[slug]` | `● SSG (ISR)` | Pre-computed pages driven by `generateStaticParams` |
| `/admin` | `ƒ Dynamic` | Strictly secured admin management endpoints |

**API Status Update**: The internal dynamic `/api` directory has been intentionally completely decommissioned to eliminate bot-driven compute exhaustion vulnerabilities.

---

## 4. Compute & Cost Optimization ("Credit Shield")
Due to severe Server Handler duration spikes initiated through scrapers and bad-actors early in production (April 2026), the application has been retrofitted with a zero-waste compute model:

### Edge Proxy Integration
- **Proxy Override**: Moved standard middleware.ts enforcement to `proxy.ts`, processing logic directly on the Next.js edge prior to standard Next.js lifecycle bindings.
### Bot Protection
- **Fail-Fast User-Agent Filtering**: `BAD_BOT_USER_AGENTS` are intercepted at `src/proxy.ts`. Headless browsers, python-requests, and common crawlers targeting restricted paths are immediately bounced with an absolute `403 Forbidden` response, utilizing precisely `0ms` of database execution time.
### Hard Timeouts
- **Promise Bound Execution**: Native APIs traversing Supabase (such as `getPublishedBlogs` inside `blog-actions.ts`) are enveloped dynamically in a generic `withTimeout` block. This strictly forces Promise cancellation precisely at `500ms`, absolutely preventing Serverless Handler hang-times from inflating credit costs.
### Authentication Optimization
- **Data Call Pruning**: `supabase.auth.getUser()` invocation logic is now strictly bounded uniquely inside `/admin` boundaries. The public landing matrix safely pre-renders without any redundant, expensive authorization payloads querying Supabase databases.

---

## 5. Project Structure
A structural annotation of the updated frontend framework:

```text
src/
  app/
    globals.css               # Global variable design system
    layout.tsx                # Context layouts, OpenGraph bounds
    page.tsx                  # Public Index
    blog/
      page.tsx                # Strict Static (ISR) Blog Listings
      [slug]/                 # SSG dynamic generation logic
    admin/                    # Next.js Dynamic (Cookies evaluation)
  components/                 # All interactive modules and Shadcn
    home/ 
    admin/ 
  actions/                    # Next.js Server Actions with Supabase
  proxy.ts                    # Edge compute perimeter shield (Replaces middleware)
```

---

## 6. Environment & Deployment Notes

### Workspace Fix
The Next.js Turbopack compiler workspace mapping was locked purely inside the `meezan-website` directory. Extraneous local machine parent directory lockfiles (i.e., `package-lock.json` in the outer Meezan-Folder) are explicitly purged to guarantee Netlify runner execution does not hallucinate false root assignments on CI bindings.

### Build Requirements
Executing `npm run build` initiates strict TypeScript schema validation specifically verifying generic wrappers bounding Server Component execution. Code will deliberately bail if a `PostgrestResponse` query logic fails to return explicit types on data bounds prior to `withTimeout` handling.

### Development Start
```bash
git clone <repository-url>
cd meezan-website
npm install
npm run dev
```

---

## 7. Known Issues & Architectural Fixes
- **Fixed:** Deployed the **Zero-Waste Compute Mitigations** to seal API loops and dynamic static page hydration issues occurring from Next 16 Edge boundaries improperly evaluating generic cookie contexts from Supabase.
- **Fixed:** Cleaned `ContactSection` to map correctly on disabled inputs.

---

## 8. Future Enhancements
- **Student portal / login system**: User authentication via Supabase/NextAuth.
- **Online course enrollment**: Payment gateway integration (Stripe / Razorpay).
- **Multi-language support**: English, Urdu, and Telugu support formats.
- **Email notification system**: SendGrid integration for form contact generation.

---

## 9. Contact & Credits
- **Client**: Meezan Educational Institute, Hyderabad
- **Website**: www.meezanedu.com
- **Built by**: A2S Labs
- **Developers**: Saif & Azeem
- **Contact**: hello@a2slabs.com
- **Copyright**: © 2026 A2S Labs. All rights reserved.
