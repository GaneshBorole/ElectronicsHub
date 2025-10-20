import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products?limit=6");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...p, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart successfully!");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-600 text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Welcome to{" "}
            <span className="text-yellow-300">ElectronicsHub ⚡</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Your one-stop destination for cutting-edge electronics and
            unbeatable prices.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
          >
            🛒 Shop Now
          </button>
        </div>
      </section>

      {/* Showcase Image */}
      {/* Full-width Image Section */}
      <div className="w-full bg-gray-50 py-16 px-0">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1800&q=80"
          alt="Modern Electronics"
          className="w-full h-[600px] object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Featured Products */}
      <section className="max-w-6xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onAdd={addToCart} />
          ))}
        </div>
        {/* Browse All Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate("/shop")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          >
            Browse All →
          </button>
        </div>
      </section>
    </>
  );
}
