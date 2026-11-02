"use client";

import { useState } from "react";
import { screenshot, type Site } from "@/lib/demos";

/** Searchable grid of website cards; each opens the live site in a new tab. */
export function SiteGrid({ sites }: { sites: Site[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const shown = query ? sites.filter((s) => `${s.name} ${s.url} ${s.industry}`.toLowerCase().includes(query)) : sites;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {shown.length} website{shown.length === 1 ? "" : "s"}
        </p>
        <label className="relative w-full sm:w-72">
          <svg className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search websites"
            aria-label="Search websites"
            className="w-full rounded-full border border-line bg-surface py-3 pr-4 pl-11 text-[15px] text-fg outline-none focus:border-accent"
          />
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-muted">{sites.length ? "No websites match your search." : "Websites are loading. Please refresh in a moment."}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener"
              className="group block overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="shimmer relative aspect-[16/10] overflow-hidden">
                <div className="absolute top-2.5 left-3 z-10 flex gap-1.5" aria-hidden="true">
                  <i className="h-2 w-2 rounded-full bg-white/85 ring-1 ring-black/10" />
                  <i className="h-2 w-2 rounded-full bg-white/85 ring-1 ring-black/10" />
                  <i className="h-2 w-2 rounded-full bg-white/85 ring-1 ring-black/10" />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={screenshot(s.url)} alt={`${s.name} website`} loading="lazy" className="relative h-full w-full object-cover object-top transition duration-[3000ms] group-hover:scale-[1.03]" />
              </div>
              <div className="px-4 pt-3.5 pb-4">
                <span className="inline-block rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-bold tracking-wide text-accent uppercase">{s.industry}</span>
                <h3 className="font-display mt-2.5 mb-1 text-[17px] font-bold text-heading">{s.name}</h3>
                <div className="flex items-center justify-between gap-2 text-[13px] text-muted">
                  <span className="truncate">{s.url.replace(/^https?:\/\//, "")}</span>
                  <span className="font-bold whitespace-nowrap text-accent">Visit →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
