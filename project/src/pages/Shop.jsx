import React, { useState } from "react";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [q, setQ] = useState("");

  const filtered = productsData.filter((p) =>
    p.title.toLowerCase().includes(q.toLowerCase())
  );

  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...p, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${p.title} added to cart`);
  };

  return (
    <section className="px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Shop</h2>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={addToCart} />
        ))}
      </div>
    </section>
  );
}
