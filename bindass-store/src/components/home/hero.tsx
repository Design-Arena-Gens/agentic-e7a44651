"use client";

import Link from "next/link";
import { HiMiniArrowLongRight } from "react-icons/hi2";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--accent)] to-[#ff784f] p-8 text-white shadow-[0_30px_60px_rgba(255,76,41,0.35)]">
      <div className="space-y-4">
        <span className="rounded-full bg-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em]">
          Exclusive Drop
        </span>
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          Elevate your everyday with curated styles & tech.
        </h1>
        <p className="max-w-md text-sm text-white/85 md:text-base">
          Discover limited-edition essentials, design-led furniture, and beauty
          rituals crafted to keep you inspired. All in one Bindass experience.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--accent)] transition hover:bg-white/90"
          >
            Explore categories <HiMiniArrowLongRight className="text-lg" />
          </Link>
          <Link
            href="/products/aurora-luxe-jacket"
            className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold transition hover:border-white hover:bg-white/10"
          >
            Featured product
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-10 bottom-0 hidden aspect-[3/4] w-1/3 min-w-[220px] rounded-full bg-white/15 blur-3xl md:block" />
    </section>
  );
}
