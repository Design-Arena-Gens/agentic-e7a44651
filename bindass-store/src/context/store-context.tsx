"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as initialProducts } from "@/data/products";
import type {
  CartItem,
  PaymentMethod,
  Product,
  UserProfile,
} from "@/lib/types";

interface StoreContextValue {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  profile: UserProfile;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  selectPaymentMethod: (method: PaymentMethod) => void;
  selectedPayment: PaymentMethod;
}

const demoProfile: UserProfile = {
  name: "Ananya Mehta",
  email: "ananya@bindass.store",
  avatar: "https://ui-avatars.com/api/?name=Ananya+Mehta&background=FF4C29&color=fff",
  wishlist: [],
  addresses: [
    {
      id: "addr-default",
      label: "Primary",
      recipient: "Ananya Mehta",
      street: "501, Sunrise Residency",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: "addr-work",
      label: "Work",
      recipient: "Ananya Mehta",
      street: "12th Floor, Tech Park One",
      city: "Pune",
      state: "Maharashtra",
      postalCode: "411001",
      phone: "+91 98222 11000",
    },
  ],
  orders: [
    {
      id: "ORD-240928",
      status: "Delivered",
      date: "Aug 24, 2024",
      amount: 329.49,
      items: [
        {
          product: initialProducts[0],
          quantity: 1,
        },
        {
          product: initialProducts[1],
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-240915",
      status: "Processing",
      date: "Sep 15, 2024",
      amount: 279.99,
      items: [
        {
          product: initialProducts[5],
          quantity: 1,
        },
      ],
    },
  ],
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("UPI");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, Math.min(quantity, 5)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    setSelectedPayment(method);
  };

  const value = useMemo(
    () => ({
      products: initialProducts,
      cart,
      wishlist,
      profile: { ...demoProfile, wishlist },
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      selectPaymentMethod,
      selectedPayment,
    }),
    [cart, wishlist, selectedPayment],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}
