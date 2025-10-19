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
    alert("Added to cart");
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={addToCart} />
        ))}
      </div>
      <div className="mt-6 text-right">
        <button onClick={() => navigate("/shop")} className="px-4 py-2 bg-blue-600 text-white rounded">Browse All</button>
      </div>
    </section>
  );
}
