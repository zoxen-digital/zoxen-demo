import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe2, LayoutGrid, MonitorSmartphone } from "lucide-react";
import { screenshot, type Demos, type Industry } from "@/lib/demos";
import { industryIcon } from "@/lib/industries";
import { Logo } from "./Logo";
import { SiteGrid } from "./SiteGrid";
import { ThemeToggle } from "./ThemeToggle";

const CONTACT = "https://zoxendigital.com";

/** Whole page. Home: hero + industry cards + all sites. Industry page: short header + that industry's sites. */
export function Gallery({ data, current }: { data: Demos; current?: Industry }) {
  const sites = current ? data.sites.filter((s) => s.slug === current.slug) : data.sites;
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4">
        {current ? <IndustryHeader data={data} current={current} /> : <Hero data={data} />}
        {!current && <Industries industries={data.industries} />}
        <section id="websites" className="scroll-mt-24 pb-6">
          {!current && (
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-heading sm:text-[28px]">All websites</h2>
              <p className="mt-1 text-sm text-muted">Every card opens the live website.</p>
            </div>
          )}
          <SiteGrid sites={sites} />
        </section>
        <Cta />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-muted">© {new Date().getFullYear()} Zoxen Digital · Websites for local businesses</footer>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" aria-label="Zoxen Digital demos home">
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/#industries" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-muted hover:text-heading md:block">
            Industries
          </Link>
          <Link href="/#websites" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-muted hover:text-heading md:block">
            Websites
          </Link>
          <ThemeToggle />
          <a href={CONTACT} target="_blank" rel="noopener" className="hidden h-10 items-center rounded-full bg-navy px-4 text-sm font-semibold text-white transition hover:bg-brand sm:inline-flex dark:bg-white dark:text-navy dark:hover:bg-white/90">
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}

/** Navy panel like the portal's sign-in page: glow, dot grid, and floating previews of real sites. */
function Hero({ data }: { data: Demos }) {
  const previews = data.sites.slice(0, 3);
  return (
    <section className="relative mt-6 overflow-hidden rounded-[28px] bg-navy px-6 py-12 text-white sm:px-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -top-24 -left-24 h-[380px] w-[380px] rounded-full bg-brand/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 -bottom-32 h-[340px] w-[340px] rounded-full bg-violet/35 blur-[120px]" />
      <div className="dots pointer-events-none absolute inset-0 opacity-[0.07]" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> {data.sites.length} live websites
          </span>
          <h1 className="mt-5 text-[34px] leading-[1.08] font-bold sm:text-[46px]">Websites we built for businesses like yours.</h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/65">Real, live websites for restaurants, contractors, clinics, cleaners and more. Pick your industry and see what yours could look like.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#industries" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-navy transition hover:bg-white/90">
              Browse by industry <ArrowRight className="h-4 w-4" />
            </a>
            <a href={CONTACT} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10">
              Start a project
            </a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <Stat icon={LayoutGrid} value={String(data.sites.length)} label="Websites" />
            <Stat icon={Globe2} value={String(data.industries.length)} label="Industries" />
            <Stat icon={MonitorSmartphone} value="100%" label="Mobile ready" />
          </dl>
        </div>

        {/* Floating previews (laptops and up) */}
        <div className="relative hidden h-[360px] lg:block" aria-hidden="true">
          {previews.map((s, i) => (
            <div
              key={s.url}
              className={`absolute w-[300px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 ${["top-0 right-6 z-10", "top-24 left-0 z-20", "right-0 bottom-0 z-30"][i]}`}
              style={{ animation: `zx-float ${6 + i}s ease-in-out ${i * 0.8}s infinite` }}
            >
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
                <i className="h-2 w-2 rounded-full bg-red-400" />
                <i className="h-2 w-2 rounded-full bg-amber-400" />
                <i className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="ml-2 truncate text-[10px] text-slate-400">{s.url.replace(/^https?:\/\//, "")}</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={screenshot(s)} alt="" className="aspect-[16/10] w-full bg-slate-100 object-cover object-top" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Globe2; value: string; label: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-white/55">
        <Icon className="h-3.5 w-3.5" /> {label}
      </dt>
      <dd className="font-display mt-1 text-2xl font-bold">{value}</dd>
    </div>
  );
}

/** Industry cards with icon and count. */
function Industries({ industries }: { industries: Industry[] }) {
  return (
    <section id="industries" className="scroll-mt-24 py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold text-heading sm:text-[28px]">Browse by industry</h2>
          <p className="mt-1 text-sm text-muted">Open your industry to see only the websites that fit your business.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {industries.map((i) => {
          const Icon = industryIcon(i.name);
          return (
            <Link key={i.slug} href={`/${i.slug}`} className="card group flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:ring-1 hover:ring-brand/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-heading">{i.name}</span>
                <span className="block text-xs text-muted">
                  {i.count} website{i.count === 1 ? "" : "s"}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition group-hover:text-accent" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/** Industry page header plus a row to jump to other industries. */
function IndustryHeader({ data, current }: { data: Demos; current: Industry }) {
  const Icon = industryIcon(current.name);
  return (
    <section className="pt-8 pb-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-heading">
        <ArrowLeft className="h-4 w-4" /> All industries
      </Link>
      <div className="relative mt-4 overflow-hidden rounded-[28px] bg-navy px-6 py-10 text-white sm:px-10">
        <div className="pointer-events-none absolute -top-24 -right-16 h-[300px] w-[300px] rounded-full bg-brand/40 blur-[110px]" />
        <div className="dots pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className="relative flex flex-wrap items-center gap-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Icon className="h-7 w-7 text-indigo-200" />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-[30px] leading-tight font-bold sm:text-[40px]">{current.name} websites</h1>
            <p className="mt-1 text-white/65">
              {current.count} live website{current.count === 1 ? "" : "s"} we built for {current.name.toLowerCase()} businesses.
            </p>
          </div>
          <a href={CONTACT} target="_blank" rel="noopener" className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-navy transition hover:bg-white/90">
            Get one like these <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      <nav aria-label="Other industries" className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {data.industries.map((i) => (
          <Link
            key={i.slug}
            href={`/${i.slug}`}
            className={`flex-none rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${i.slug === current.slug ? "border-navy bg-navy text-white dark:border-white dark:bg-white dark:text-navy" : "border-line bg-surface text-muted hover:text-heading"}`}
          >
            {i.name}
          </Link>
        ))}
      </nav>
    </section>
  );
}

function Cta() {
  return (
    <section className="relative my-14 overflow-hidden rounded-[28px] bg-navy px-6 py-12 text-center text-white">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-brand/35 blur-[120px]" />
      <div className="dots pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="relative">
        <h2 className="text-2xl font-bold sm:text-3xl">Want a website like these?</h2>
        <p className="mx-auto mt-2 max-w-md text-white/65">Fast, mobile-friendly and made for your industry. Tell us about your business and we will take it from there.</p>
        <a href={CONTACT} target="_blank" rel="noopener" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-navy transition hover:bg-white/90">
          Talk to Zoxen Digital <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
