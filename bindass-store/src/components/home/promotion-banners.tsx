"use client";

import Link from "next/link";

const banners = [
  {
    title: "Festive Edit",
    description: "Handcrafted fits & jewelry for every celebration.",
    cta: "Shop the edit",
    href: "/categories?selected=Fashion",
  },
  {
    title: "Smart Living",
    description: "Design-minded tech that keeps up with your pace.",
    cta: "Upgrade now",
    href: "/categories?selected=Electronics",
  },
];

export function PromotionBanners() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {banners.map((banner) => (
        <div
          key={banner.title}
          className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_54px_rgba(17,17,17,0.12)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            {banner.title}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-[var(--foreground)]">
            {banner.description}
          </h3>
          <Link
            href={banner.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#e34624]"
          >
            {banner.cta}
          </Link>
        </div>
      ))}
    </section>
  );
}
