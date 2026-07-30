import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const emptyForm = {
  name: "",
  description: "",
  category: "Other",
  manufacturer: "",
  price: "",
  stock: "",
  image: "",
  requiresPrescription: false,
};

const CATEGORIES = [
  "Pain Relief", "Antibiotics", "Vitamins & Supplements", "Cold & Flu",
  "Digestive Health", "Skin Care", "First Aid", "Baby Care", "Diabetes Care", "Other",
];

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  const loadMedicines = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/medicines", { params: { limit: 100 } });
      setMedicines(data.medicines);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const openCreateForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (medicine) => {
    setFormData({
      name: medicine.name,
      description: medicine.description,
      category: medicine.category,
      manufacturer: medicine.manufacturer || "",
      price: medicine.price,
      stock: medicine.stock,
      image: medicine.image || "",
      requiresPrescription: medicine.requiresPrescription,
    });
    setEditingId(medicine._id);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = { ...formData, price: Number(formData.price), stock: Number(formData.stock) };
      if (editingId) {
        await api.put(`/medicines/${editingId}`, payload);
      } else {
        await api.post("/medicines", payload);
      }
      setShowForm(false);
      loadMedicines();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save medicine");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine? This cannot be undone.")) return;
    try {
      await api.delete(`/medicines/${id}`);
      loadMedicines();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete medicine");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-ink">Manage Medicines</h1>
        <button onClick={openCreateForm} className="px-5 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">
          + Add Medicine
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-primary-100 rounded-2xl p-6 mb-8">
          <h2 className="font-display font-semibold text-lg text-ink mb-4">
            {editingId ? "Edit Medicine" : "Add New Medicine"}
          </h2>
          {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Name</label>
              <input name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Price (₹)</label>
              <input type="number" min="0" step="0.01" name="price" required value={formData.price} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Stock</label>
              <input type="number" min="0" name="stock" required value={formData.stock} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Manufacturer</label>
              <input name="manufacturer" value={formData.manufacturer} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1">Image URL</label>
              <input name="image" value={formData.image} onChange={handleChange} placeholder="https://…" className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-ink/80 mb-1">Description</label>
              <textarea name="description" required rows={3} value={formData.description} onChange={handleChange} className="w-full rounded-lg border border-primary-200 px-4 py-2.5 text-sm outline-none focus:border-primary-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="requiresPrescription" name="requiresPrescription" checked={formData.requiresPrescription} onChange={handleChange} className="w-4 h-4" />
              <label htmlFor="requiresPrescription" className="text-sm text-ink/70">Requires prescription</label>
            </div>
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button type="submit" className="px-6 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700">
                {editingId ? "Save Changes" : "Add Medicine"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-full border border-primary-200 text-ink/70 text-sm font-semibold hover:bg-primary-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-ink/50">Loading medicines…</p>
      ) : (
        <div className="bg-white border border-primary-100 rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-primary-100 text-ink/50">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id} className="border-b border-primary-50 last:border-0">
                  <td className="px-4 py-3 font-medium text-ink">{m.name}</td>
                  <td className="px-4 py-3 text-ink/60">{m.category}</td>
                  <td className="px-4 py-3 text-ink/60">₹{m.price}</td>
                  <td className={`px-4 py-3 font-semibold ${m.stock <= 10 ? "text-red-500" : "text-ink/60"}`}>{m.stock}</td>
                  <td className="px-4 py-3 flex gap-3">
                    <button onClick={() => openEditForm(m)} className="text-primary-700 font-semibold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(m._id)} className="text-red-500 font-semibold hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMedicines;
