import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const updateQty = (idx, val) => {
    const copy = [...cart];
    copy[idx].qty = Math.max(1, val);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const removeItem = (idx) => {
    const copy = [...cart];
    copy.splice(idx, 1);
    setCart(copy);
    localStorage.setItem("cart", JSON.stringify(copy));
  };

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 && <div>Your cart is empty. <Link to="/shop" className="text-blue-600">Shop now</Link></div>}
      <div className="space-y-4">
        {cart.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded">
            <img src={item.image || "https://via.placeholder.com/100"} alt={item.title} className="w-24 h-24 object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div>₹{item.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(idx, item.qty - 1)} className="px-2 border">-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(idx, item.qty + 1)} className="px-2 border">+</button>
            </div>
            <button onClick={() => removeItem(idx)} className="px-3 py-1 border rounded">Remove</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <div className="text-xl font-bold mb-2">Total: ₹{total}</div>
          <button className="px-4 py-2 bg-green-600 text-white rounded">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
