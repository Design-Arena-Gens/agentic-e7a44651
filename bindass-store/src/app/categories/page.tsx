"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export default function CategoriesPage() {
  const params = useSearchParams();
  const router = useRouter();
  const initialCategory = params.get("selected");
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory,
  );

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  const handleSelect = (categoryName: string | null) => {
    setActiveCategory(categoryName);
    const query = categoryName ? `?selected=${encodeURIComponent(categoryName)}` : "";
    router.replace(`/categories${query}`, { scroll: false });
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-10 md:py-14">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Explore
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Categories
          </h1>
          <button
            onClick={() => handleSelect(null)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              !activeCategory
                ? "bg-[var(--accent)] text-white"
                : "bg-white text-[var(--muted)] shadow-sm"
            }`}
          >
            Reset filters
          </button>
        </div>
        <p className="max-w-xl text-sm text-[var(--muted)]">
          Discover curated picks across fashion, technology, beauty, home, and
          accessories. Tap a category to browse collections tailored to your
          vibe.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              onClick={() =>
                handleSelect(isActive ? null : (category.name as string))
              }
              className={`flex flex-col items-start gap-3 rounded-[var(--radius-md)] p-5 text-left transition ${
                isActive
                  ? "bg-[var(--accent)] text-white shadow-[0_24px_48px_rgba(255,76,41,0.35)]"
                  : "bg-white text-[var(--foreground)] shadow-[0_18px_32px_rgba(17,17,17,0.08)] hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(17,17,17,0.14)]"
              }`}
            >
              <span className="text-3xl">{category.icon}</span>
              <div>
                <p className="text-sm font-semibold">{category.name}</p>
                <p className="text-xs text-white/80">
                  {isActive ? "Showing now" : "Tap to explore"}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            {activeCategory ? `${activeCategory} Finds` : "All Products"}
          </h2>
          <span className="text-sm text-[var(--muted)]">
            {filteredProducts.length} items
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
