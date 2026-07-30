import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? "text-primary-700" : "text-ink/70 hover:text-primary-700"
  }`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-primary-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-800 text-xl text-primary-800">
          <span className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-display font-bold">+</span>
          MediCart
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/medicines" className={navLinkClass}>Medicines</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          {user && <NavLink to="/dashboard" className={navLinkClass}>My Orders</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative text-ink/80 hover:text-primary-700" aria-label="View cart">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.602-7.164.087-.352-.185-.68-.547-.68H5.106M7.5 14.25L5.106 5.272M6 18.75a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm12 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink/70">Hi, {user.name.split(" ")[0]}</span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 text-primary-700 hover:bg-primary-50 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="text-sm font-semibold px-4 py-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden text-ink" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary-100 bg-white px-4 py-4 flex flex-col gap-3">
          <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/medicines" className={navLinkClass} onClick={() => setMenuOpen(false)}>Medicines</NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/cart" className={navLinkClass} onClick={() => setMenuOpen(false)}>Cart ({cartCount})</NavLink>
          {user && <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>My Orders</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>}
          {user ? (
            <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left text-sm font-semibold text-primary-700">Logout</button>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-semibold px-4 py-2 rounded-full border border-primary-200 text-primary-700">Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-sm font-semibold px-4 py-2 rounded-full bg-primary-600 text-white">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
