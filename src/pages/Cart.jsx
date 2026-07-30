import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { cart, fetchCart, updateCartItem, removeFromCart, cartTotal, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (user) fetchCart();
  }, [user, fetchCart]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display font-bold text-2xl text-ink mb-3">Please log in to view your cart</h1>
        <Link to="/login" className="text-primary-700 font-semibold hover:underline">Go to login →</Link>
      </div>
    );
  }

  const items = cart.items || [];

  const handleQuantityChange = async (medicineId, quantity) => {
    setUpdatingId(medicineId);
    try {
      await updateCartItem(medicineId, quantity);
    } catch (error) {
      alert(error.response?.data?.message || "Could not update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (medicineId) => {
    setUpdatingId(medicineId);
    try {
      await removeFromCart(medicineId);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display font-bold text-3xl text-ink mb-8">Your Cart</h1>

      {loading ? (
        <p className="text-ink/50">Loading cart…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/60 text-lg mb-4">Your cart is empty.</p>
          <Link to="/medicines" className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700">
            Browse Medicines
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.medicine._id} className="flex gap-4 bg-white border border-primary-100 rounded-2xl p-4">
                <img
                  src={item.medicine.image || "https://placehold.co/120x120/eefdf6/17a876?text=Rx"}
                  alt={item.medicine.name}
                  className="w-20 h-20 rounded-xl object-cover bg-primary-50"
                />
                <div className="flex-1">
                  <Link to={`/medicines/${item.medicine._id}`} className="font-display font-semibold text-ink hover:text-primary-700">
                    {item.medicine.name}
                  </Link>
                  <p className="text-sm text-ink/50">₹{item.medicine.price} each</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-primary-200 rounded-full">
                      <button
                        disabled={updatingId === item.medicine._id}
                        onClick={() => handleQuantityChange(item.medicine._id, item.quantity - 1)}
                        className="px-3 py-1 text-ink/60 hover:text-primary-700"
                      >−</button>
                      <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                      <button
                        disabled={updatingId === item.medicine._id}
                        onClick={() => handleQuantityChange(item.medicine._id, item.quantity + 1)}
                        className="px-3 py-1 text-ink/60 hover:text-primary-700"
                      >+</button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.medicine._id)}
                      disabled={updatingId === item.medicine._id}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="font-display font-bold text-ink">
                  ₹{(item.medicine.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-primary-100 rounded-2xl p-6 h-fit">
            <h2 className="font-display font-semibold text-lg text-ink mb-4">Order Summary</h2>
            <div className="flex justify-between text-sm text-ink/70 mb-2">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink/70 mb-4">
              <span>Delivery</span>
              <span className="text-primary-600 font-semibold">Free</span>
            </div>
            <div className="border-t border-primary-100 pt-4 flex justify-between font-display font-bold text-lg text-ink mb-6">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-primary-600 text-white font-semibold py-3 rounded-full hover:bg-primary-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
