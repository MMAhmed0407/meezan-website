# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Meezan Educational Institute website. The integration covers client-side event tracking across all major user interactions, server-side lead confirmation, user identification on form submissions and admin login, PostHog error tracking on admin auth failures, and a reverse proxy via Next.js rewrites. PostHog is now initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), replacing the previous `useEffect`-based init.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `contact_form_submitted` | User successfully submits the contact enquiry form in the main Contact section. | `src/components/home/ContactSection.tsx` |
| `contact_widget_opened` | User opens the floating contact widget (top of the enquiry conversion funnel). | `src/components/global/FloatingContact.tsx` |
| `contact_widget_submitted` | User successfully submits the enquiry form via the floating contact widget. | `src/components/global/FloatingContact.tsx` |
| `enquire_now_clicked` | User clicks the Enquire Now button on a course card, triggering the contact widget. | `src/components/global/ContactWidgetButton.tsx` |
| `teachers_training_enroll_clicked` | User clicks the Enroll Now button on a Teacher's Training programme accordion item. | `src/app/(main)/teachers-training/TeachersTrainingPageContent.tsx` |
| `whatsapp_cta_clicked` | User clicks a WhatsApp chat CTA button to start a conversation with the institute. | `src/components/home/ContactSection.tsx`, `src/app/(main)/teachers-training/TeachersTrainingPageContent.tsx` |
| `blog_post_viewed` | User views a blog post page (top of content-to-enrolment conversion funnel). | `src/components/blog/BlogAnalytics.tsx` |
| `explore_courses_clicked_from_blog` | User clicks the Explore Courses CTA at the bottom of a blog post article. | `src/components/blog/BlogAnalytics.tsx` |
| `admin_login_success` | Admin user successfully signs in to the admin portal. | `src/components/admin/AdminLoginForm.tsx` |
| `contact_form_submitted_server` | Server-side event confirming a contact form submission was saved to the database. | `src/app/actions/contact.ts` |

## Files created / modified

- **`instrumentation-client.ts`** (new) — PostHog client-side init for Next.js 15.3+
- **`src/app/providers/PostHogProvider.tsx`** (updated) — Removed manual `useEffect` init; now just wraps children with `PostHogProvider` for React hooks
- **`next.config.ts`** (updated) — Added PostHog reverse proxy rewrites (`/ingest/*`)
- **`src/lib/posthog-server.ts`** (new) — Server-side `PostHog` client factory using `posthog-node`
- **`.env.local`** (new) — `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` env vars
- **`src/components/blog/BlogAnalytics.tsx`** (new) — `BlogPostTracker` and `BlogExploreCTAButton` client components

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/362381/dashboard/1739457)
- **Insight 1**: [Total Contact Form Submissions](https://us.posthog.com/project/362381/insights/qU65RC6h) — client-side submission trends across both channels
- **Insight 2**: [Enquiry Conversion Funnel](https://us.posthog.com/project/362381/insights/qy9pIIqh) — widget open → enquiry submitted
- **Insight 3**: [Course Enquiry Clicks by Channel](https://us.posthog.com/project/362381/insights/C01HqTA9) — Enquire Now, Teachers Training enroll, WhatsApp CTA
- **Insight 4**: [Blog to Courses Conversion Funnel](https://us.posthog.com/project/362381/insights/GdRbCFle) — blog post read → Explore Courses clicked
- **Insight 5**: [Server-side Lead Confirmations](https://us.posthog.com/project/362381/insights/ZjEuAahq) — ground-truth lead count from the database

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — a handler that only identifies on fresh login can leave returning sessions on anonymous distinct IDs.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
