"use client";

import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { screenshot, type Site } from "@/lib/demos";

/** Searchable grid of website cards; each opens the live site in a new tab. */
export function SiteGrid({ sites }: { sites: Site[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const shown = query ? sites.filter((s) => `${s.name} ${s.url} ${s.industry}`.toLowerCase().includes(query)) : sites;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">
          {shown.length} website{shown.length === 1 ? "" : "s"}
        </p>
        <label className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search websites"
            aria-label="Search websites"
            className="h-11 w-full rounded-full border border-line bg-surface pr-4 pl-11 text-sm text-fg outline-none focus:border-brand"
          />
        </label>
      </div>

      {shown.length === 0 ? (
        <p className="card py-16 text-center text-muted">{sites.length ? "No websites match your search." : "Websites are loading. Please refresh in a moment."}</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener" className="card group block overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-3.5 py-2.5" aria-hidden="true">
                <i className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <i className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 flex-1 truncate rounded-full bg-surface px-3 py-0.5 text-[11px] text-muted">{s.url.replace(/^https?:\/\//, "")}</span>
              </div>
              <div className="shimmer relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={screenshot(s.url)} alt={`${s.name} website`} loading="lazy" className="relative h-full w-full object-cover object-top transition duration-[3000ms] group-hover:scale-[1.03]" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-bold text-heading">{s.name}</h3>
                  <p className="truncate text-xs text-muted">{s.industry}</p>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted transition group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
