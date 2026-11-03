import { getDemos, screenshotSource } from "@/lib/demos";

/**
 * Screenshot of one portfolio site, served through our domain so Vercel's CDN keeps it: only the first
 * visitor waits for the screenshot service, everyone after gets it straight from the cache.
 * Only sites in the portfolio are allowed, so this cannot be used as an open image proxy.
 */
export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("u") || "";
  const { sites } = await getDemos();
  if (!sites.some((s) => s.url === url)) return new Response("Not found", { status: 404 });
  const res = await fetch(screenshotSource(url), { signal: AbortSignal.timeout(25000) }).catch(() => null);
  if (!res?.ok) return new Response("Screenshot not ready", { status: 502, headers: { "Cache-Control": "no-store" } });
  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/png",
      // Browser keeps it a week; the CDN a month and refreshes in the background after that.
      "Cache-Control": "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=2592000",
    },
  });
}
