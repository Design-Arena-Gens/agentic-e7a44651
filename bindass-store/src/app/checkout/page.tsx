"use client";

import { useMemo, useState } from "react";
import { HiCheckCircle, HiOutlineCreditCard } from "react-icons/hi2";
import { useStore } from "@/context/store-context";
import type { PaymentMethod } from "@/lib/types";

const paymentLabels: Record<PaymentMethod, string> = {
  COD: "Cash on Delivery",
  UPI: "UPI / QR Payment",
  Card: "Credit / Debit Card",
};

export default function CheckoutPage() {
  const { cart, profile, selectedPayment, selectPaymentMethod } = useStore();
  const [selectedAddress, setSelectedAddress] = useState(
    profile.addresses.find((address) => address.isDefault)?.id ??
      profile.addresses[0]?.id,
  );

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
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-10 md:py-14">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Checkout
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Complete your order
          </h1>
          <span className="rounded-full bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)]">
            Bindass Assurance
          </span>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Double-check your delivery details and choose a payment option. We’ll
          send live updates the moment your order ships.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
            <header className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Delivery Address
              </h2>
              <button className="text-sm font-semibold text-[var(--accent)]">
                + Add new
              </button>
            </header>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {profile.addresses.map((address) => {
                const active = selectedAddress === address.id;
                return (
                  <button
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`relative rounded-[var(--radius-md)] p-4 text-left transition ${
                      active
                        ? "border-2 border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_16px_28px_rgba(255,76,41,0.2)]"
                        : "border border-[var(--muted)]/20 bg-white"
                    }`}
                  >
                    {active && (
                      <HiCheckCircle className="absolute right-4 top-4 text-xl text-[var(--accent)]" />
                    )}
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {address.label}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {address.recipient}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {address.street}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {address.phone}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Payment Options
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {(["COD", "UPI", "Card"] as PaymentMethod[]).map((method) => {
                const active = method === selectedPayment;
                return (
                  <button
                    key={method}
                    onClick={() => selectPaymentMethod(method)}
                    className={`flex flex-col gap-2 rounded-[var(--radius-md)] p-4 text-left transition ${
                      active
                        ? "border-2 border-[var(--accent)] bg-[var(--accent)]/5 shadow-[0_16px_28px_rgba(255,76,41,0.2)]"
                        : "border border-[var(--muted)]/20 bg-white"
                    }`}
                  >
                    <HiOutlineCreditCard className="text-xl text-[var(--accent)]" />
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {paymentLabels[method]}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {method === "COD" && "Pay when the package arrives at your door."}
                      {method === "UPI" && "Supports PhonePe, GPay, Paytm, and more."}
                      {method === "Card" && "All major Visa, MasterCard, Amex cards accepted."}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
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
              <span>GST (12%)</span>
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
          <button className="mt-4 w-full rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-white transition hover:bg-[#e34624]">
            Place order securely
          </button>
          <p className="text-xs text-[var(--muted)]">
            By placing your order you agree to the Bindass Store terms, privacy,
            and return policies.
          </p>
        </aside>
      </div>
    </div>
  );
}
