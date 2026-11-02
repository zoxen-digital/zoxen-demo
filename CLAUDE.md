# Zoxen Demos (demo.zoxendigital.com)

Public portfolio of websites built by Zoxen Digital, filtered by industry. Shared with prospects as
`demo.zoxendigital.com/<industry-slug>` (e.g. `/restaurant-and-food`) so they only see work from their field.

## How it works
- Next.js 15 (App Router) + Tailwind 4, no database of its own.
- The list comes from the Zoxen portal: `GET https://portal.zoxendigital.com/api/public/demos`
  (override with `DEMOS_API_URL`). Pages revalidate every 5 minutes.
- Sites are added, deleted, renamed, re-categorised or hidden in the portal under **Business → Demo Websites**
  (portal repo: `../Invoice software`, model `src/models/DemoSite.ts`, industries list `DEMO_INDUSTRIES`).
- Screenshots are live from image.thum.io (`src/lib/demos.ts`).
- Brand: same tokens and fonts as the portal (Sora headings, Hanken Grotesk text, brand #2639e8, violet #6c3bf5,
  navy #0b1020). Dark mode follows the visitor's device.

## Run
- `npm run dev` (port 3100), `npm run build`.
- Deploy: Vercel project with this folder; domain `demo.zoxendigital.com` (CNAME `demo` -> `cname.vercel-dns.com` at Hostinger).
