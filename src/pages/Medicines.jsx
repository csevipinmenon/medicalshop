import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import MedicineCard from "../components/MedicineCard";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const CATEGORIES = [
  "All",
  "Pain Relief",
  "Antibiotics",
  "Vitamins & Supplements",
  "Cold & Flu",
  "Digestive Health",
  "Skin Care",
  "First Aid",
  "Baby Care",
  "Diabetes Care",
  "Other",
];

const Medicines = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const category = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/medicines", {
          params: { category, search, page, limit: 9 },
        });
        setMedicines(data.medicines);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, search, page]);

  const updateParams = (updates) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, ...updates, page: updates.page || 1 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ink mb-2">All Medicines</h1>
        <p className="text-ink/60">Browse and order everyday health essentials.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search medicines…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 rounded-lg border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-500 outline-none"
          />
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">
            Search
          </button>
        </form>
        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value })}
          className="rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-ink/50">Loading medicines…</p>
      ) : medicines.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-ink/60 text-lg mb-2">No medicines found.</p>
          <p className="text-ink/40 text-sm">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} onAddToCart={handleAddToCart} adding={addingId === med._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Medicines;
