"use client";

import { useStore } from "@/context/store-context";
import { HiMiniTruck, HiCheckBadge } from "react-icons/hi2";

export default function OrdersPage() {
  const { profile } = useStore();

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-5 py-10 md:py-14">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Orders
        </p>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Track your journey
        </h1>
        <p className="text-sm text-[var(--muted)]">
          We keep you posted at every milestone. Here’s the latest on your Bindass
          deliveries.
        </p>
      </header>
      <div className="space-y-4">
        {profile.orders.map((order) => (
          <div
            key={order.id}
            className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  {order.status}
                </p>
                <h2 className="text-xl font-semibold text-[var(--foreground)]">
                  {order.id}
                </h2>
                <p className="text-sm text-[var(--muted)]">{order.date}</p>
              </div>
              <p className="rounded-full bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)]">
                ₹{order.amount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              <p className="flex items-center gap-2">
                <HiMiniTruck className="text-[var(--accent)]" />
                {order.status === "Delivered"
                  ? "Delivered with OTP confirmation."
                  : "Preparing dispatch · Courier will share tracking soon."}
              </p>
              <p className="flex items-center gap-2">
                <HiCheckBadge className="text-[var(--accent)]" />
                Bindass Assurance covers 14-day hassle-free returns.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
