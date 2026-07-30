import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive ? "bg-primary-600 text-white" : "text-ink/70 hover:bg-primary-50"
  }`;

const AdminLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="bg-white border border-primary-100 rounded-2xl p-4 h-fit">
        <h2 className="font-display font-bold text-ink px-2 mb-4">Admin Panel</h2>
        <nav className="space-y-1">
          <NavLink to="/admin" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/admin/medicines" className={linkClass}>Medicines</NavLink>
          <NavLink to="/admin/orders" className={linkClass}>Orders</NavLink>
          <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
