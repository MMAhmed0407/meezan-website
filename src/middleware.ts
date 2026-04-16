import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const BAD_BOT_USER_AGENTS = [
  'python-requests', 'curl', 'wget', 'postman', 'insomnia', 'httpclient', 'headless', 'puppeteer'
];

export async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const pathname = request.nextUrl.pathname;

  // 1. Fail-Fast for strict bad actors
  const isBadBot = BAD_BOT_USER_AGENTS.some(bot => userAgent.includes(bot));
  
  // Broad bot detection (includes Googlebot, Bingbot etc.)
  const isBot = isBadBot || ['bot', 'spider', 'crawler', 'scraper', 'slurp'].some(bot => userAgent.includes(bot));
  const isRestrictedPath = pathname.startsWith('/admin') || pathname.startsWith('/api');

  // Immediately block malicious programmatic tools across ALL routes, 
  // OR block standard bots (Google/Bing) from crawling strictly forbidden routes.
  if (isBadBot || (isBot && isRestrictedPath)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Default pass-through behavior
  let response = NextResponse.next({ request });

  // 3. Precision Auth Enforcement
  // ONLY run the heavy DB lookup on /admin routes. This resolves the massive compute exhaustion on static pages.
  if (pathname.startsWith('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This invokes the Supabase Auth cycle natively.
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
