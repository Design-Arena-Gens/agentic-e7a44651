"use client";

import { useMemo, useState } from "react";
import { HiPlus, HiOutlineTrash, HiPencilSquare } from "react-icons/hi2";
import { products as seedProducts } from "@/data/products";
import type { Product } from "@/lib/types";

interface AdminProduct extends Product {
  inventory: number;
}

const createDraftProduct = (): AdminProduct => ({
  id: `draft-${Date.now()}`,
  name: "",
  slug: "",
  category: "Fashion",
  price: 0,
  rating: 4.5,
  reviews: 0,
  description: "",
  highlights: [],
  images: [],
  inventory: 10,
});

export default function AdminPage() {
  const [products, setProducts] = useState<AdminProduct[]>(
    seedProducts.map((item) => ({ ...item, inventory: 50 })),
  );
  const [draft, setDraft] = useState<AdminProduct>(createDraftProduct());
  const [editingId, setEditingId] = useState<string | null>(null);

  const metrics = useMemo(() => {
    const totalInventory = products.reduce(
      (sum, product) => sum + product.inventory,
      0,
    );
    const averagePrice =
      products.reduce((sum, product) => sum + product.price, 0) /
      (products.length || 1);
    return {
      totalProducts: products.length,
      totalInventory,
      averagePrice,
    };
  }, [products]);

  const handleSave = () => {
    if (!draft.name || !draft.slug || !draft.images.length) return;
    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId ? { ...draft, id: editingId } : product,
        ),
      );
    } else {
      setProducts((prev) => [
        { ...draft, id: `admin-${Date.now()}` },
        ...prev,
      ]);
    }
    setDraft(createDraftProduct());
    setEditingId(null);
  };

  const handleEdit = (product: AdminProduct) => {
    setDraft(product);
    setEditingId(product.id);
  };

  const handleDelete = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
    if (editingId === productId) {
      setDraft(createDraftProduct());
      setEditingId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-5 py-10 md:py-14">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Admin Ops
          </p>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Product Command Center
          </h1>
        </div>
        <span className="rounded-full bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)]">
          Live store snapshot
        </span>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            catalogue
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            {metrics.totalProducts}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">Active listings</p>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            inventory
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            {metrics.totalInventory}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">Units in stock</p>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            avg price
          </p>
          <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
            ₹{metrics.averagePrice.toFixed(0)}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Across all categories
          </p>
        </div>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {editingId ? "Edit product" : "Add new product"}
            </h2>
            <p className="text-sm text-[var(--muted)]">
              Provide key details and upload image URLs to update the storefront.
            </p>
          </div>
          <button
            onClick={() => {
              setDraft(createDraftProduct());
              setEditingId(null);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--muted)]/20 px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
          >
            Reset
          </button>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Name
            </label>
            <input
              value={draft.name}
              onChange={(event) =>
                setDraft((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Product title"
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Slug
            </label>
            <input
              value={draft.slug}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  slug: event.target.value.replace(/\s+/g, "-").toLowerCase(),
                }))
              }
              placeholder="product-slug"
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Category
            </label>
            <select
              value={draft.category}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  category: event.target.value as AdminProduct["category"],
                }))
              }
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            >
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Price (₹)
            </label>
            <input
              type="number"
              min={0}
              value={draft.price}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  price: Number(event.target.value),
                }))
              }
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Description
            </label>
            <textarea
              value={draft.description}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              rows={3}
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Primary image URL
            </label>
            <input
              value={draft.images[0] ?? ""}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  images: [event.target.value],
                }))
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Inventory
            </label>
            <input
              type="number"
              min={0}
              value={draft.inventory}
              onChange={(event) =>
                setDraft((prev) => ({
                  ...prev,
                  inventory: Number(event.target.value),
                }))
              }
              className="w-full rounded-[var(--radius-sm)] border border-[var(--muted)]/20 bg-[#f9f9f9] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]/40"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e34624]"
        >
          <HiPlus />
          {editingId ? "Update product" : "Add product"}
        </button>
      </section>

      <section className="rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_18px_32px_rgba(17,17,17,0.08)]">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Product Catalogue
          </h2>
          <p className="text-sm text-[var(--muted)]">
            {products.length} items • {metrics.totalInventory} units in stock
          </p>
        </header>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--muted)]">
                <th className="pb-3">Name</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Inventory</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--muted)]/10">
              {products.map((product) => (
                <tr key={product.id} className="align-top">
                  <td className="py-4 font-semibold text-[var(--foreground)]">
                    {product.name}
                  </td>
                  <td className="py-4 text-[var(--muted)]">{product.category}</td>
                  <td className="py-4 text-[var(--muted)]">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 text-[var(--muted)]">
                    {product.inventory}
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#f5f5f5] px-3 py-1 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--accent)]"
                      >
                        <HiPencilSquare />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-[#ffe9e3] px-3 py-1 text-xs font-semibold text-[var(--accent)] transition hover:bg-[#ffd2c5]"
                      >
                        <HiOutlineTrash />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
