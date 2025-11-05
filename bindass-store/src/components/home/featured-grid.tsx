"use client";

import { useMemo } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedGrid() {
  const featured = useMemo(
    () => products.filter((product) => product.featured).slice(0, 4),
    [],
  );

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Featured For You
        </h2>
        <span className="rounded-full bg-[var(--accent)]/10 px-4 py-1 text-xs font-semibold text-[var(--accent)]">
          Curated drops
        </span>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
