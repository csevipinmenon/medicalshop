import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
    <h1 className="font-display font-800 text-6xl text-primary-600 mb-4">404</h1>
    <p className="text-ink/60 mb-6">We couldn't find the page you were looking for.</p>
    <Link to="/" className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
