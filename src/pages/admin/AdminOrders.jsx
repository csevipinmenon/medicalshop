import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const statusColors = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-primary-100 text-primary-700",
  Cancelled: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <p className="text-ink/50">Loading orders…</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p className="text-ink/50">No orders have been placed yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-primary-100 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div>
                  <span className="text-xs text-ink/40">Order ID</span>
                  <div className="font-mono text-sm text-ink/70">{order._id}</div>
                </div>
                <div className="text-sm text-ink/70">
                  <span className="font-semibold">{order.user?.name}</span> · {order.user?.email}
                </div>
                <select
                  value={order.status}
                  disabled={updatingId === order._id}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 outline-none ${statusColors[order.status]}`}
                >
                  {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="text-sm text-ink/70 space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-between items-center border-t border-primary-100 pt-3 text-sm">
                <span className="text-ink/50">📞 {order.phone} · {order.shippingAddress}</span>
                <span className="font-display font-bold text-ink">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
