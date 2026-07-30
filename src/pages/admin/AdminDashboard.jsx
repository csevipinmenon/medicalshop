import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const StatCard = ({ label, value, accent }) => (
  <div className="bg-white border border-primary-100 rounded-2xl p-6">
    <div className="text-sm text-ink/50 mb-1">{label}</div>
    <div className={`font-display font-bold text-2xl ${accent || "text-ink"}`}>{value}</div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-ink/50">Loading dashboard…</p>;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-ink mb-6">Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Customers" value={stats.totalUsers} />
        <StatCard label="Total Medicines" value={stats.totalMedicines} />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toFixed(2)}`} accent="text-primary-700" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-primary-100 rounded-2xl p-6">
          <h2 className="font-display font-semibold text-ink mb-3">Pending Orders</h2>
          <p className="text-3xl font-display font-bold text-amber-600">{stats.pendingOrders}</p>
          <p className="text-sm text-ink/50 mt-1">Orders awaiting processing</p>
        </div>
        <div className="bg-white border border-primary-100 rounded-2xl p-6">
          <h2 className="font-display font-semibold text-ink mb-3">Low Stock Alerts</h2>
          {stats.lowStock.length === 0 ? (
            <p className="text-sm text-ink/50">All medicines are well stocked.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {stats.lowStock.map((m) => (
                <li key={m._id} className="flex justify-between">
                  <span className="text-ink/70">{m.name}</span>
                  <span className="text-red-500 font-semibold">{m.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
