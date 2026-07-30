import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-primary-100 text-primary-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const justPlacedOrderId = searchParams.get("orderPlaced");

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/orders/my");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink mb-1">Welcome, {user?.name}</h1>
        <p className="text-ink/60">Here's a look at your account and orders.</p>
      </div>

      {justPlacedOrderId && (
        <div className="bg-primary-50 border border-primary-200 text-primary-800 rounded-xl px-5 py-4 mb-8">
          🎉 Your order has been placed successfully! We'll notify you as it progresses.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-primary-100 rounded-2xl p-6">
          <div className="text-sm text-ink/50 mb-1">Total Orders</div>
          <div className="font-display font-bold text-2xl text-ink">{orders.length}</div>
        </div>
        <div className="bg-white border border-primary-100 rounded-2xl p-6">
          <div className="text-sm text-ink/50 mb-1">Account Email</div>
          <div className="font-display font-semibold text-ink truncate">{user?.email}</div>
        </div>
        <div className="bg-white border border-primary-100 rounded-2xl p-6">
          <div className="text-sm text-ink/50 mb-1">Account Type</div>
          <div className="font-display font-semibold text-ink capitalize">{user?.role}</div>
        </div>
      </div>

      <h2 className="font-display font-bold text-xl text-ink mb-4">Order History</h2>

      {loading ? (
        <p className="text-ink/50">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-ink/50">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-primary-100 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs text-ink/40">Order ID</span>
                  <div className="font-mono text-sm text-ink/70">{order._id}</div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-ink/70 space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-primary-100 pt-3">
                <span className="text-xs text-ink/40">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="font-display font-bold text-ink">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
