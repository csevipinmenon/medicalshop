import React from "react";
import { Link } from "react-router-dom";

const MedicineCard = ({ medicine, onAddToCart, adding }) => {
  const outOfStock = medicine.stock <= 0;

  return (
    <div className="group bg-white rounded-2xl border border-primary-100 overflow-hidden hover:shadow-lg hover:shadow-primary-100 transition-shadow flex flex-col">
      <Link to={`/medicines/${medicine._id}`} className="block h-40 bg-primary-50 overflow-hidden">
        <img
          src={medicine.image || "https://placehold.co/400x300/eefdf6/17a876?text=Medicine"}
          alt={medicine.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-600">{medicine.category}</span>
        <Link to={`/medicines/${medicine._id}`}>
          <h3 className="font-display font-semibold text-ink mt-1 mb-1 line-clamp-1">{medicine.name}</h3>
        </Link>
        <p className="text-sm text-ink/60 line-clamp-2 mb-3">{medicine.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display font-bold text-lg text-ink">₹{medicine.price}</span>
          {outOfStock ? (
            <span className="text-xs font-semibold text-red-500">Out of stock</span>
          ) : (
            <button
              onClick={() => onAddToCart(medicine)}
              disabled={adding}
              className="text-sm font-semibold px-3 py-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60 transition-colors"
            >
              {adding ? "Adding…" : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
