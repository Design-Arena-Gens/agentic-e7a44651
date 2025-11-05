"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMiniStar, HiOutlineTruck, HiShieldCheck } from "react-icons/hi2";
import { useStore } from "@/context/store-context";
import type { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const { addToCart } = useStore();

  return (
    <div className="mx-auto w-full max-w-6xl gap-10 px-5 py-10 md:grid md:grid-cols-2 md:py-14">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[#f9f9f9]">
          <Image
            src={`${activeImage}?auto=format&fit=crop&w=1200&q=80`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 90vw"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3">
          {product.images.map((image) => {
            const active = image === activeImage;
            return (
              <button
                key={image}
                onClick={() => setActiveImage(image)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${
                  active ? "border-[var(--accent)]" : "border-transparent"
                }`}
              >
                <Image
                  src={`${image}?auto=format&fit=crop&w=400&q=80`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
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
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <HiMiniStar className="text-lg text-[var(--accent)]" />
            <span>
              {product.rating.toFixed(1)} rating · {product.reviews} reviews
            </span>
          </div>
          <p className="text-lg text-[var(--muted)]">{product.description}</p>
        </div>

        <div className="rounded-[var(--radius-md)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-3xl font-bold text-[var(--foreground)]">
            ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Free returns within 30 days · Secure checkout
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 w-full rounded-full bg-[var(--accent)] py-4 text-sm font-semibold text-white transition hover:bg-[#e34624]"
          >
            Add to Cart
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Product Highlights
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {product.highlights.map((item) => (
              <li
                key={item}
                className="rounded-[var(--radius-sm)] bg-white px-4 py-3 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 shadow-sm">
            <div className="rounded-full bg-[var(--accent)]/10 p-3 text-[var(--accent)]">
              <HiOutlineTruck className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Express delivery
              </p>
              <p className="text-xs text-[var(--muted)]">
                Same-day delivery available in metro cities.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-white p-4 shadow-sm">
            <div className="rounded-full bg-[var(--accent)]/10 p-3 text-[var(--accent)]">
              <HiShieldCheck className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Bindass Assurance
              </p>
              <p className="text-xs text-[var(--muted)]">
                1-year warranty & dedicated concierge support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
