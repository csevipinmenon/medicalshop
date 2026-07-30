import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, cartTotal, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shippingAddress: user?.address || "",
    phone: user?.phone || "",
    paymentMethod: "Cash on Delivery",
  });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  const items = cart.items || [];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPlacing(true);
    try {
      const { data } = await api.post("/orders", formData);
      await fetchCart();
      navigate(`/dashboard?orderPlaced=${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-bold text-2xl text-ink mb-3">Your cart is empty</h1>
        <p className="text-ink/60">Add some medicines before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl text-ink mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white border border-primary-100 rounded-2xl p-6 space-y-4">
          {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Shipping Address</label>
            <textarea
              name="shippingAddress"
              required
              rows={3}
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="House no, street, city, state, PIN code"
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="For delivery updates"
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500"
            >
              <option>Cash on Delivery</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={placing}
            className="w-full bg-primary-600 text-white font-semibold py-3 rounded-full hover:bg-primary-700 disabled:opacity-60 transition-colors"
          >
            {placing ? "Placing order…" : `Place Order — ₹${cartTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="bg-white border border-primary-100 rounded-2xl p-6 h-fit">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">Items ({items.length})</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.medicine._id} className="flex justify-between text-sm text-ink/70">
                <span>{item.medicine.name} × {item.quantity}</span>
                <span>₹{(item.medicine.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-primary-100 pt-4 flex justify-between font-display font-bold text-ink">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
