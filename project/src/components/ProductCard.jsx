import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded p-4 bg-white flex flex-col">
      <img src={product.image || "https://via.placeholder.com/300x200"} alt={product.title} className="w-full h-48 object-cover mb-3 rounded" />
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description?.slice(0, 90)}...</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="font-bold">₹{product.price}</div>
        <div className="flex gap-2">
          <Link to={`/product/${product._id}`} className="text-sm px-3 py-1 border rounded">View</Link>
          <button onClick={() => onAdd(product)} className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Add</button>
        </div>
      </div>
    </div>
  );
}
