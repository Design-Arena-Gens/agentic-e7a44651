import { Hero } from "@/components/home/hero";
import { SearchBar } from "@/components/home/search-bar";
import { FeaturedGrid } from "@/components/home/featured-grid";
import { CategoryGrid } from "@/components/home/category-grid";
import { PromotionBanners } from "@/components/home/promotion-banners";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 md:py-14">
      <header className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Welcome to
            </p>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              Bindass Store
            </h1>
          </div>
          <div className="hidden rounded-full bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)] md:block">
            Shop Smart, Live Bindass
          </div>
        </div>
        <SearchBar />
      </header>
      <Hero />
      <PromotionBanners />
      <FeaturedGrid />
      <CategoryGrid />
    </div>
  );
}
