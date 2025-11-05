"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineCog6Tooth, HiOutlineEnvelope, HiArrowRight } from "react-icons/hi2";
import { useStore } from "@/context/store-context";

export default function ProfilePage() {
  const { profile, wishlist, cart, selectedPayment } = useStore();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-10 md:py-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={64}
              height={64}
              className="rounded-full border-4 border-[var(--accent)]/20"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent)] text-lg font-semibold text-white">
              {profile.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Logged in
            </p>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">
              {profile.name}
            </h1>
            <p className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <HiOutlineEnvelope />
              {profile.email}
            </p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-[var(--muted)]/20 px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]">
          <HiOutlineCog6Tooth />
          Account settings
        </button>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Orders
          </p>
          <p className="mt-3 text-3xl font-bold text-[var(--foreground)]">
            {profile.orders.length}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {profile.orders[0]?.status} · Last order{" "}
            {profile.orders[0]?.date}
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Wishlist
          </p>
          <p className="mt-3 text-3xl font-bold text-[var(--foreground)]">
            {wishlist.length}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Tap hearts on products to save them here.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Cart
          </p>
          <p className="mt-3 text-3xl font-bold text-[var(--foreground)]">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Payment preference: {selectedPayment}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Recent Orders
          </h2>
          <button className="text-sm font-semibold text-[var(--accent)] hover:underline">
            View all
          </button>
        </header>
        <div className="space-y-4">
          {profile.orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[var(--radius-md)] bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    {order.status}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">
                    {order.id}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-[var(--foreground)]">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </p>
                  <Link
                    href="/orders"
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    Track order <HiArrowRight />
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {order.items.map((item) => (
                  <Link
                    key={item.product.id}
                    href={`/products/${item.product.slug}`}
                    className="flex min-w-[200px] items-center gap-3 rounded-2xl bg-[#f9f9f9] px-3 py-2"
                  >
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                      <Image
                        src={`${item.product.images[0]}?auto=format&fit=crop&w=200&q=80`}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--foreground)]">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        Qty {item.quantity}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Wishlist
          </h2>
          <Link
            href="/"
            className="text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Discover more
          </Link>
        </header>
        {wishlist.length === 0 ? (
          <div className="rounded-[var(--radius-md)] bg-white p-6 text-sm text-[var(--muted)] shadow-sm">
            Your wishlist is waiting for its first favorite. Tap the heart on a
            product to save it.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {wishlist.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="rounded-[var(--radius-md)] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(17,17,17,0.14)]"
              >
                <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-2xl bg-[#f9f9f9]">
                  <Image
                    src={`${product.images[0]}?auto=format&fit=crop&w=400&q=80`}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  {product.name}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
