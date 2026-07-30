import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MedicineCard from "../components/MedicineCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const categories = [
  { name: "Pain Relief", icon: "💊" },
  { name: "Vitamins & Supplements", icon: "🍊" },
  { name: "Cold & Flu", icon: "🤧" },
  { name: "Digestive Health", icon: "🌿" },
  { name: "Skin Care", icon: "🧴" },
  { name: "Baby Care", icon: "🍼" },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/medicines", { params: { limit: 4 } });
        setFeatured(data.medicines);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAddToCart = async (medicine) => {
    if (!user) return navigate("/login");
    setAddingId(medicine._id);
    try {
      await addToCart(medicine._id, 1);
    } catch (error) {
      alert(error.response?.data?.message || "Could not add to cart");
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-700 bg-primary-100 px-3 py-1 rounded-full mb-5">
              Licensed Online Pharmacy
            </span>
            <h1 className="font-display font-800 text-4xl md:text-5xl leading-tight text-ink mb-5">
              Your medicine cabinet,
              <span className="text-primary-600"> delivered to your door.</span>
            </h1>
            <p className="text-ink/70 text-lg mb-8 max-w-md">
              Order genuine medicines, health essentials and everyday care products — verified quality, fast delivery, no queues.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/medicines" className="px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
                Shop Medicines
              </Link>
              <Link to="/about" className="px-6 py-3 rounded-full border border-primary-200 text-primary-700 font-semibold hover:bg-primary-50 transition-colors">
                Learn More
              </Link>
            </div>
            <div className="blister-divider mt-10 max-w-xs">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <span className="line"></span>
            </div>
            <p className="text-xs text-ink/50 mt-2">Trusted by thousands of households for daily essentials.</p>
          </div>
          <div className="relative">
            <div className="rounded-3xl bg-primary-600/5 border border-primary-100 p-8">
              <img
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
                alt="Pharmacist preparing medicine order"
                className="rounded-2xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display font-bold text-2xl text-ink mb-2">Shop by Category</h2>
        <p className="text-ink/60 mb-8">Find exactly what you need, faster.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/medicines?category=${encodeURIComponent(cat.name)}`}
              className="bg-white border border-primary-100 rounded-2xl p-5 text-center hover:shadow-md hover:border-primary-300 transition-all"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-xs font-semibold text-ink/80">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured medicines */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-ink mb-2">Popular Right Now</h2>
            <p className="text-ink/60">Frequently ordered by our customers.</p>
          </div>
          <Link to="/medicines" className="text-primary-700 font-semibold text-sm hover:underline">View all →</Link>
        </div>

        {loading ? (
          <p className="text-ink/50">Loading medicines…</p>
        ) : featured.length === 0 ? (
          <p className="text-ink/50">No medicines available yet. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((med) => (
              <MedicineCard key={med._id} medicine={med} onAddToCart={handleAddToCart} adding={addingId === med._id} />
            ))}
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className="bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-display font-bold text-3xl mb-1">100%</div>
            <div className="text-primary-200 text-sm">Genuine & Verified Medicines</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl mb-1">24-48hr</div>
            <div className="text-primary-200 text-sm">Average Delivery Time</div>
          </div>
          <div>
            <div className="font-display font-bold text-3xl mb-1">10,000+</div>
            <div className="text-primary-200 text-sm">Orders Delivered</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
