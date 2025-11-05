"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiMagnifyingGlass, HiArrowRight } from "react-icons/hi2";
import { products } from "@/data/products";
import { categories } from "@/data/products";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const suggestions = useMemo(() => {
    if (!query.trim()) {
      return [];
    }
    const normalized = query.toLowerCase();
    const productMatches = products
      .filter((product) => product.name.toLowerCase().includes(normalized))
      .slice(0, 4)
      .map((product) => ({
        type: "product" as const,
        label: product.name,
        value: product.slug,
      }));
    const categoryMatches = categories
      .filter((category) => category.name.toLowerCase().includes(normalized))
      .map((category) => ({
        type: "category" as const,
        label: `${category.name} · Category`,
        value: category.name,
      }));
    return [...categoryMatches, ...productMatches];
  }, [query]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!suggestions.length) return;
    const first = suggestions[0];
    navigateTo(first);
  };

  const navigateTo = (item: (typeof suggestions)[number]) => {
    if (item.type === "product") {
      router.push(`/products/${item.value}`);
    } else {
      router.push(`/categories?selected=${encodeURIComponent(item.value)}`);
    }
    setQuery("");
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-full border border-[var(--muted)]/20 bg-white px-5 py-3 shadow-sm transition focus-within:border-[var(--accent)]/40"
      >
        <HiMagnifyingGlass className="text-lg text-[var(--muted)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products, trends, and more"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
        />
        <button
          type="submit"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-white transition hover:bg-[#e34624]"
        >
          <HiArrowRight />
        </button>
      </form>
      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-3xl bg-white shadow-xl">
          <ul className="divide-y divide-[var(--muted)]/10 text-sm">
            {suggestions.map((item) => (
              <li key={`${item.type}-${item.value}`}>
                <button
                  onClick={() => navigateTo(item)}
                  className="flex w-full items-center justify-between px-5 py-3 text-left transition hover:bg-[var(--accent)]/5"
                >
                  <span className="font-medium text-[var(--foreground)]">
                    {item.label}
                  </span>
                  <HiArrowRight className="text-[var(--muted)]" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
