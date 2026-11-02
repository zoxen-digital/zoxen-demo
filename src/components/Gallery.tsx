import Link from "next/link";
import type { Demos, Industry } from "@/lib/demos";
import { SiteGrid } from "./SiteGrid";

const CONTACT = "https://zoxendigital.com";

/** Whole page: header, hero, industry filters, the websites and a closing call to action. */
export function Gallery({ data, current }: { data: Demos; current?: Industry }) {
  const sites = current ? data.sites.filter((s) => s.slug === current.slug) : data.sites;
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="" className="h-9 w-9 rounded-xl" />
            <span className="font-display leading-none font-extrabold tracking-[0.08em] text-heading">
              ZOXEN
              <span className="block text-[9px] tracking-[0.4em] text-accent">DIGITAL</span>
            </span>
          </Link>
          <a href={CONTACT} target="_blank" rel="noopener" className="rounded-full bg-gradient-to-r from-brand to-violet px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-lg shadow-brand/30 transition hover:brightness-110">
            Get your website
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-14 pb-6 text-center">
          <span className="inline-block rounded-full bg-accent/10 px-3.5 py-1.5 text-xs font-bold tracking-[0.08em] text-accent uppercase">{current ? current.name : "Our work"}</span>
          <h1 className="font-display mx-auto mt-4 mb-3 max-w-3xl text-[32px] leading-[1.08] font-extrabold tracking-tight text-heading sm:text-5xl">
            {current ? current.name : "Websites we built for"}{" "}
            <span className="bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">{current ? "websites" : "real businesses"}</span>
          </h1>
          <p className="mx-auto max-w-xl text-[17px] leading-relaxed text-muted">
            {current ? `Live websites we built for ${current.name.toLowerCase()} businesses.` : "Browse live websites by industry. Every one is a real business, online today."}
          </p>
        </section>

        <nav aria-label="Industries" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:flex-wrap lg:justify-center">
          <Chip href="/" on={!current} label="All" count={data.sites.length} />
          {data.industries.map((i) => (
            <Chip key={i.slug} href={`/${i.slug}`} on={current?.slug === i.slug} label={i.name} count={i.count} />
          ))}
        </nav>

        <SiteGrid sites={sites} />

        <section className="mx-auto mt-6 mb-16 max-w-3xl rounded-3xl bg-gradient-to-br from-navy via-[#1a1f6b] to-[#3b1fa0] px-6 py-10 text-center text-white">
          <h2 className="font-display mb-2 text-2xl font-bold sm:text-3xl">Want a website like these?</h2>
          <p className="mb-5 text-white/75">Fast, mobile-friendly and built for your industry.</p>
          <a href={CONTACT} target="_blank" rel="noopener" className="inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-white/90">
            Talk to Zoxen Digital
          </a>
        </section>
      </main>
      <footer className="pb-8 text-center text-sm text-muted">© {new Date().getFullYear()} Zoxen Digital</footer>
    </>
  );
}

function Chip({ href, on, label, count }: { href: string; on: boolean; label: string; count: number }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`flex-none rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-navy bg-navy text-white dark:border-brand dark:bg-brand" : "border-line bg-surface text-muted hover:text-heading"}`}
    >
      {label}
      <span className="ml-1.5 opacity-60">{count}</span>
    </Link>
  );
}
