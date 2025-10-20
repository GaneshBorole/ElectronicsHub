import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded-xl shadow-lg bg-white overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-200">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-800">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 flex-1">
          {product.description.slice(0, 80)}...
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">
            ₹{product.price}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
