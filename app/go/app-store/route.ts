import { appStoreUrl, type CtaPlacement } from '@/lib/cta';

// Campaign parameters vary per request; never prerender this response.
export const dynamic = 'force-dynamic';

const CAMPAIGNS = {
  qr: 'offsite_qr',
  discord: 'offsite_discord',
  directory: 'offsite_directory',
} as const satisfies Record<string, CtaPlacement>;

/** Stable off-site link. Accept only known campaigns and keep the destination fixed. */
export function GET(request: Request) {
  const campaign = new URL(request.url).searchParams.get('ct');
  const placement = campaign && Object.hasOwn(CAMPAIGNS, campaign)
    ? CAMPAIGNS[campaign as keyof typeof CAMPAIGNS]
    : 'offsite_shortlink';

  return new Response(null, {
    status: 307,
    headers: {
      Location: appStoreUrl(placement),
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
}
