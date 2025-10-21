import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  const handleView = () => {
    // 🔹 Save product to viewed history
    let viewed = JSON.parse(localStorage.getItem("viewed") || "[]");

    // Remove duplicates (based on product ID)
    viewed = viewed.filter((p) => p._id !== product._id);
    viewed.unshift(product); // Add newest first

    // Limit to last 10 viewed products (optional)
    if (viewed.length > 10) viewed = viewed.slice(0, 10);

    localStorage.setItem("viewed", JSON.stringify(viewed));

    // 🔹 Navigate to product details (if you have that page)
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleView}
      className="border rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 duration-200 cursor-pointer"
    >
      <img
        src={product.image || "https://via.placeholder.com/300x200"}
        alt={product.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-1">
          {product.description?.slice(0, 80)}...
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            ₹{product.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              onAdd(product);
            }}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
