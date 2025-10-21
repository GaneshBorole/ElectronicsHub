import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import auth context

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get user from auth context

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
    if (!user) {
      alert("Please login to add items to your cart ✅");
      navigate("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...p, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart successfully!");
  };

  const handleShopAccess = () => {
    if (user) {
      navigate("/shop"); // ✅ logged-in user can access
    } else {
      alert("Please login to continue ✅");
      navigate("/login");
    }
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
            onClick={handleShopAccess}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
          >
            🛒 Shop Now
          </button>
        </div>
      </section>

      {/* Full-width Showcase Image */}
      <div className="w-full bg-gray-50 py-16 px-0">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1800&q=80"
          alt="Modern Electronics"
          className="w-full h-[600px] object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        />
      </div>

      {/* Featured Products */}
      <section className="max-w-6xl w-full mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} onAdd={addToCart} />
          ))}
        </div>

        {/* Browse All Button */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleShopAccess}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          >
            Browse All →
          </button>
        </div>
      </section>
    </>
  );
}
