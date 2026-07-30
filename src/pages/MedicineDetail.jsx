import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const MedicineDetail = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/medicines/${id}`);
        setMedicine(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    setAdding(true);
    setMessage("");
    try {
      await addToCart(medicine._id, quantity);
      setMessage("Added to cart!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add to cart");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-ink/50">Loading…</div>;
  if (!medicine) return <div className="max-w-4xl mx-auto px-4 py-16 text-ink/50">Medicine not found. <Link to="/medicines" className="text-primary-700 underline">Back to medicines</Link></div>;

  const outOfStock = medicine.stock <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/medicines" className="text-sm text-primary-700 font-semibold hover:underline">← Back to medicines</Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <div className="bg-primary-50 rounded-2xl overflow-hidden h-96">
          <img
            src={medicine.image || "https://placehold.co/600x600/eefdf6/17a876?text=Medicine"}
            alt={medicine.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{medicine.category}</span>
          <h1 className="font-display font-bold text-3xl text-ink mt-2 mb-3">{medicine.name}</h1>
          {medicine.manufacturer && <p className="text-sm text-ink/50 mb-4">By {medicine.manufacturer}</p>}
          <p className="text-ink/70 leading-relaxed mb-6">{medicine.description}</p>

          {medicine.requiresPrescription && (
            <div className="bg-amber-50 text-amber-700 text-sm rounded-lg px-4 py-3 mb-6">
              ⚠️ This medicine requires a valid prescription. Our pharmacist will verify before dispatch.
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display font-bold text-3xl text-ink">₹{medicine.price}</span>
            <span className={`text-sm font-semibold ${outOfStock ? "text-red-500" : "text-primary-600"}`}>
              {outOfStock ? "Out of stock" : `${medicine.stock} in stock`}
            </span>
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium text-ink/70">Quantity</label>
              <div className="flex items-center border border-primary-200 rounded-full">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-ink/60 hover:text-primary-700">−</button>
                <span className="px-3 text-sm font-semibold">{quantity}</span>
                <button onClick={() => setQuantity((q) => Math.min(medicine.stock, q + 1))} className="px-3 py-1.5 text-ink/60 hover:text-primary-700">+</button>
              </div>
            </div>
          )}

          {message && <p className="text-sm mb-4 text-primary-700 font-medium">{message}</p>}

          <button
            onClick={handleAddToCart}
            disabled={outOfStock || adding}
            className="px-8 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {outOfStock ? "Out of Stock" : adding ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetail;
