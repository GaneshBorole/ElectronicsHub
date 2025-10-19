import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded">
      <img src={product.image || "https://via.placeholder.com/600x400"} alt={product.title} className="w-full h-96 object-cover rounded" />
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="font-bold text-2xl mb-4">₹{product.price}</div>
        <button onClick={addToCart} className="px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
      </div>
    </div>
  );
}
