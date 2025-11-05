"use client";

import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { categories } from "@/data/products";

export function CategoryGrid() {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Trending Categories
        </h2>
        <Link
          href="/categories"
          className="text-sm font-medium text-[var(--accent)] hover:underline"
        >
          View all
        </Link>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/categories?selected=${encodeURIComponent(category.name)}`}
            className="group flex flex-col gap-3 rounded-[var(--radius-md)] bg-white p-5 shadow-[0_18px_32px_rgba(17,17,17,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(17,17,17,0.14)]"
          >
            <span className="text-3xl">{category.icon}</span>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {category.name}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                Shop now
                <HiArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
