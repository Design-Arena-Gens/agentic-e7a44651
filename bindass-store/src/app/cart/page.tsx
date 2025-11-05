"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { HiOutlineTrash, HiArrowRight } from "react-icons/hi2";
import { useStore } from "@/context/store-context";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const delivery = subtotal > 0 ? 49 : 0;
    const taxes = subtotal * 0.12;
    return {
      subtotal,
      delivery,
      taxes,
      total: subtotal + delivery + taxes,
    };
  }, [cart]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-5 py-10 md:py-14">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Your cart
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Review & refine
          </h1>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#e34624]"
          >
            Checkout <HiArrowRight />
          </Link>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Secure payments powered by Bindass Assurance. Change quantities or
          remove items before placing your order.
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] bg-white p-10 text-center shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-lg font-semibold text-[var(--foreground)]">
            Your cart is feeling light.
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Discover curated picks on the home page and add what you love.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e34624]"
          >
            Continue shopping <HiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col gap-4 rounded-[var(--radius-md)] bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-[#f9f9f9]">
                    <Image
                      src={`${item.product.images[0]}?auto=format&fit=crop&w=400&q=80`}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--foreground)]">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      {item.product.category}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                      ₹
                      {(
                        item.product.price * item.quantity
                      ).toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <div className="flex items-center gap-2 rounded-full bg-[#f5f5f5] px-3 py-2">
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.product.id,
                          Math.max(item.quantity - 1, 0),
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow"
                    >
                      –
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="flex items-center gap-2 rounded-full border border-[var(--muted)]/20 px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
                  >
                    <HiOutlineTrash />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-4 rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm text-[var(--muted)]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>
                  ₹{totals.subtotal.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>
                  ₹{totals.delivery.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes & GST</span>
                <span>
                  ₹{totals.taxes.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed border-[var(--muted)]/20 pt-3 text-base font-semibold text-[var(--foreground)]">
              <span>Total</span>
              <span>
                ₹{totals.total.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
              </span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e34624]"
            >
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
