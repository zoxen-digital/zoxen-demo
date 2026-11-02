/** The list lives in the Zoxen portal (Demo Websites page); add or remove sites there. */
const API = process.env.DEMOS_API_URL || "https://portal.zoxendigital.com/api/public/demos";

export type Industry = { name: string; slug: string; count: number };
export type Site = { url: string; name: string; industry: string; slug: string; description: string };
export type Demos = { industries: Industry[]; sites: Site[] };

/** Refreshed from the portal at most every 5 minutes. */
export async function getDemos(): Promise<Demos> {
  try {
    const res = await fetch(API, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as Demos;
  } catch {
    return { industries: [], sites: [] };
  }
}

/** Live homepage screenshot (free service, cached on their side). */
export const screenshot = (url: string) => `https://image.thum.io/get/width/640/crop/1000/noanimate/${url}`;
