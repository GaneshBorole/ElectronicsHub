import React, { useEffect, useState } from "react";

export default function History() {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("viewed") || "[]");
    setViewed(stored);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        👀 Recently Viewed Products
      </h1>

      {viewed.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't viewed any products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {viewed.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-xl p-4 transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-52 object-cover rounded mb-3"
              />
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-gray-700 mb-2">₹{p.price}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Again
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
