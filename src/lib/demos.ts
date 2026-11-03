/** The list lives in the Zoxen portal (Demo Websites page); add or remove sites there. */
const API = process.env.DEMOS_API_URL || "https://portal.zoxendigital.com/api/public/demos";

export type Industry = { name: string; slug: string; count: number };
export type Site = { url: string; name: string; industry: string; slug: string; description: string; shot?: string };
export type Demos = { industries: Industry[]; sites: Site[] };

/** Refreshed every minute, and straight away when the portal calls /api/revalidate. */
export async function getDemos(): Promise<Demos> {
  try {
    const res = await fetch(API, { next: { revalidate: 60, tags: ["demos"] } });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as Demos;
  } catch {
    return { industries: [], sites: [] };
  }
}

/** Homepage screenshot from the free service (same size as the portal asks for, so both share one render). */
export const screenshotSource = (url: string) => `https://image.thum.io/get/width/640/crop/1000/noanimate/${url}`;

/** What the page shows: the clear screenshot taken after full load, else our cached quick one (app/shot/route.ts). */
export const screenshot = (s: Pick<Site, "url" | "shot">) => s.shot || `/shot?u=${encodeURIComponent(s.url)}`;
