"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { HiMiniStar } from "react-icons/hi2";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/store-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const liked = useMemo(
    () => wishlist.some((item) => item.id === product.id),
    [wishlist, product.id],
  );

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] bg-white p-4 shadow-[0px_24px_48px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0px_28px_56px_rgba(0,0,0,0.12)]">
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[var(--accent)] shadow"
        aria-label="Toggle wishlist"
      >
        {liked ? <HiHeart className="text-xl" /> : <HiOutlineHeart className="text-xl" />}
      </button>
      <Link href={`/products/${product.slug}`} className="block space-y-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-md)] bg-[#f9f9f9]">
          <Image
            src={`${product.images[0]}?auto=format&fit=crop&w=900&q=80`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 260px, (min-width: 768px) 40vw, 80vw"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--muted)]">
            <span>{product.category}</span>
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)]">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <HiMiniStar className="text-[var(--accent)]" />
            <span>
              {product.rating.toFixed(1)} · {product.reviews} reviews
            </span>
          </div>
          <p className="text-xl font-semibold text-[var(--foreground)]">
            ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
          </p>
        </div>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-white transition hover:bg-[#e34624]"
      >
        Add to Cart
      </button>
    </div>
  );
}
