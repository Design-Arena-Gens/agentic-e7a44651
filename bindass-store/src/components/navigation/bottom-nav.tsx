"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiHome,
  HiSquares2X2,
  HiShoppingCart,
  HiUser,
  HiWrench,
} from "react-icons/hi2";

const navItems = [
  { href: "/", label: "Home", icon: HiHome },
  { href: "/categories", label: "Categories", icon: HiSquares2X2 },
  { href: "/cart", label: "Cart", icon: HiShoppingCart },
  { href: "/profile", label: "Profile", icon: HiUser },
  { href: "/admin", label: "Admin", icon: HiWrench },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div className="flex w-full max-w-xl items-center justify-between rounded-full bg-white px-5 py-3 shadow-[0_20px_35px_rgba(17,17,17,0.1)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs font-medium transition ${
                active ? "text-[var(--accent)]" : "text-[var(--muted)]"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                  active
                    ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                    : "bg-transparent"
                }`}
              >
                <Icon className="text-lg" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
