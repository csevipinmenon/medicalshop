import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ink text-primary-100 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
            <span className="w-7 h-7 rounded-lg bg-primary-500 text-white flex items-center justify-center">+</span>
            MediCart
          </div>
          <p className="text-sm text-primary-200/80 leading-relaxed">
            Genuine medicines, delivered reliably. Your health, sorted.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-200/80">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/medicines" className="hover:text-white">Medicines</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-primary-200/80">
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">My Orders</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-200/80">
            <li>support@medicart.example</li>
            <li>+91 98765 43210</li>
            <li>Ludhiana, Punjab, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-primary-200/60">
        © {new Date().getFullYear()} MediCart. All rights reserved. For demo purposes only — not a real pharmacy.
      </div>
    </footer>
  );
};

export default Footer;
