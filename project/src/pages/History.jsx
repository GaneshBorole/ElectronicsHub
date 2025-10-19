import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/orders/my"); // endpoint implemented in server below
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? <div>No orders yet.</div> : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white p-4 rounded">
              <div className="font-semibold">Order #{o._id}</div>
              <div>Date: {new Date(o.createdAt).toLocaleString()}</div>
              <div>Total: ₹{o.total}</div>
              <div className="mt-2">
                {o.items.map((it) => (
                  <div key={it._id} className="flex gap-3 items-center my-2">
                    <img src={it.image || "https://via.placeholder.com/80"} alt={it.title} className="w-16 h-16 object-cover" />
                    <div>
                      <div>{it.title}</div>
                      <div>Qty: {it.qty} — ₹{it.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
